import { PartialType } from '@nestjs/mapped-types';
import IMarks from 'src/interfaces/marks.interface';
import { CreateMarkDto } from './create-mark.dto';

export class UpdateMarkDto extends PartialType(CreateMarkDto) {
    marks:IMarks
}
