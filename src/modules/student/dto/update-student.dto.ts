import { PartialType } from '@nestjs/mapped-types';
import IStudent from 'src/interfaces/student.interface';
import CreateStudentRequestDto from './create-student-req.dto';


export class UpdateStuduntClassDto extends PartialType(CreateStudentRequestDto) {
  student: IStudent;
}