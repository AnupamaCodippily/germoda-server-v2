import IChatMessage from './chat-message.interface';
import IMeetingParticipant from './meeting-participant.interface';

export interface IMeeting {
  meetingId: string;
  meetingTitle: string;
  startTime: Date | string;
  endTime?: Date | string;
  participants: {
    [idx: string]: IMeetingParticipant;
  };
  host: {
    peerId: string;
  };
  messagesHistory: IChatMessage[];
  hostCamOn: boolean;
}
