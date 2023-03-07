import { PartialType } from '@nestjs/mapped-types';
import Icourse from 'src/interfaces/course.intface';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    course:Icourse
}
