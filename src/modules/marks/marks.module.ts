import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';

@Module({
  controllers: [MarksController],
  providers: [MarksService]
})
export class MarksModule {}
