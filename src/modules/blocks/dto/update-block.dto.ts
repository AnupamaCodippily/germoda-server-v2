import { PartialType } from '@nestjs/mapped-types';
import IBlocks from 'src/interfaces/blocks.interface';
import { CreateBlockDto } from './create-block.dto';

export class UpdateBlockDto extends PartialType(CreateBlockDto) {
    blcks:IBlocks
}
