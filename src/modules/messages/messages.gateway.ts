import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { MEETINGS_DEFAULT_DURATION_MILLISECONDS } from 'src/constants/meeting-gateway';
import { FRONTEND_ENDPOINT } from 'src/constants/urls';
import IMeetingParticipant from 'src/interfaces/meeting-participant.interface';
import { IMeeting } from 'src/interfaces/meeting.interface';
import {
  WsJwtGuard,
  WsJwtGuardAdminAndStudent,
  WsJwtGuardStudent,
} from '../auth/auth-jwt.strategy';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', FRONTEND_ENDPOINT],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @WebSocketServer() server;
  users = 0;
  async handleConnection() {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  // meetingsList = {};

  @UseGuards(WsJwtGuardAdminAndStudent)
  @SubscribeMessage('client-send-message-to-server')
  async onChat(client, message) {
    const { meetingName, senderName, messageBody } = message;

    const meetingSettings: any = await this.cacheManager.get(meetingName);
    if (meetingSettings) {
      meetingSettings?.messagesHistory?.push();
      console.log(meetingSettings);

      this.cacheManager.set(
        meetingName,
        meetingSettings,
        MEETINGS_DEFAULT_DURATION_MILLISECONDS,
      );
      this.server.emit('server-send-messages-to-clients', message);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('end-meeting')
  async onEndMeeting(client, message) {
    // TODO: delete meeting chat
    this.server.emit('server-send-end-meeting-message-to-clients', message);
  }

  @UseGuards(WsJwtGuardAdminAndStudent)
  @SubscribeMessage('host-connected-to-meeting')
  async onClientConnectToMeeting(client, message) {
    const { meetingId } = message;

    console.log('The host joined the meeting ' + meetingId);

    const meetingSettings: IMeeting = await this.cacheManager.get(meetingId);

    if (meetingSettings) {
      // the client will receive the existing message history
      client.emit('server-ack-host-joining', {
        messageHistory: meetingSettings?.messagesHistory,
        participants: meetingSettings.participants,
      });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('host-started-meeting')
  async onHostStartMeeting(client, message) {
    // get meeting name
    const { title, meetingId, hostPeerId } = message;

    console.log('Host started meeting: ' + meetingId);

    const meetingSettings: IMeeting = await this.cacheManager.get(meetingId);

    if (!meetingSettings) {
      console.log('Meeting initialized');

      const meeting: IMeeting = {
        meetingId,
        meetingTitle: title,
        startTime: Date.now().toString(),
        participants: {},
        messagesHistory: [],
        hostCamOn: false,
        host: {
          peerId: hostPeerId,
        },
      };

      meeting.participants['host'] = {
        meetingId,
        peerId: hostPeerId,
        name: 'host',
        settings: {
          allowedVideo: true,
          mic: false,
          video: false,
        },
      };

      await this.cacheManager.set(
        meetingId,
        meeting,
        MEETINGS_DEFAULT_DURATION_MILLISECONDS,
      );
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('host-turned-on-camera')
  async onHostCamOn(client, meeting) {
    const {
      hostPeerId,
      meetingId,
      meetingSettings: { isCamOn, isMicOn, isScreenShared },
    } = meeting;

    const meetingData: any = await this.cacheManager.get(meetingId);

    if (meetingData) {
      meetingData.hostCamOn = isCamOn;

      this.server.emit('server-sent-host-peerId-others', {
        hostPeerId,
        clientIds: Array.from(meetingData?.participants),
      });

      this.server.emit('server-sent-host-status-update', {
        hostSettings: {
          isCamOn,
          isMicOn,
          isScreenShared,
        },
      });
    } else {
      console.log(`Meeting id: ${meetingId} not found in cache!`);
    }
  }

  @UseGuards(WsJwtGuardStudent)
  @SubscribeMessage('student-turned-on-camera')
  async onClientStartCam(client, message) {
    const { hostPeerId, meetingRoomName } = message;

    if (this.cacheManager[meetingRoomName]?.hostCamOn) {
      console.log('student wants to turn on stream but host cam is on');
    } else if (this.cacheManager[meetingRoomName]) {
      console.log('student wants to turn on stream');
    }
  }

  @UseGuards(WsJwtGuardStudent)
  @SubscribeMessage('student-joined-meeting')
  async onStudentJoinMeeting(client, message) {
    const { studentPeerId, meetingId, name, participantSettings } = message;
    const meetingSettings: IMeeting = await this.cacheManager.get(meetingId);
    if (meetingSettings) {
      let participant: IMeetingParticipant = null;

      participant = {
        meetingId,
        peerId: studentPeerId,
        name,
        settings: {
          video: false,
          mic: false,
          allowedVideo: false,
        },
      };

      meetingSettings.participants[name] = participant;

      client.emit('server-sent-client-participants-list', {
        hostPeerId: meetingSettings.host.peerId,
        participants: meetingSettings.participants,
      });

      this.server.emit('server-emit-new-client-joined', {
        newClientUUID: studentPeerId,
        participant,
      });

      await this.cacheManager.set(
        meetingId,
        meetingSettings,
        MEETINGS_DEFAULT_DURATION_MILLISECONDS,
      );

      console.log('A new student joined the meeting ' + meetingId);
    } else {
      console.log('Meeting not found');
    }
  }
}
