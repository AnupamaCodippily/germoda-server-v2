import { PartialType } from '@nestjs/mapped-types';
import IVideo from 'src/interfaces/video.interface';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
    video:IVideo
}
