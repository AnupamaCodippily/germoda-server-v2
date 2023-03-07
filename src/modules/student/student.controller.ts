
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ADMIN_AUTH_JWT,
  STUDENT_AUTH_JWT,
} from 'src/constants/auth-strategy-names';
import { ADMIN_AUTH_LOCAL, STUDENT_AUTH_LOCAL } from 'src/constants/auth-strategy-names';
import CreateStudentRequestDTO from './dto/create-student-req.dto';
import { UpdateStuduntClassDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Post('/')
  async createNewStudent(@Body() createStudentDTO: CreateStudentRequestDTO) {
    return await this.studentService.createStudent(createStudentDTO);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get('/:id')
  async getStudentById(@Param('id') studentId: string) {
    return this.studentService.getStudentById(studentId);
  }


  @UseGuards(AuthGuard(STUDENT_AUTH_JWT))
  @Get('/own/:id')
  async getStudentByOwnId(@Param('id') studentId: string, @Request() req) {
    console.log(req.user);
    if (studentId === req.user.userId)
      return this.studentService.getStudentById(studentId);
    else
      throw new UnauthorizedException(
        'student attempted to fetch for another user',
      );
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
}
  @Get('/:username')
  async getStudentByUsername(@Param('username')username:string){
    return this.studentService.getStudentByUsername(username);
  }
  
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id:string,
    @Body() updateStuduntClassDto : UpdateStuduntClassDto,
  ){
    return this.studentService.update(id,updateStuduntClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id :string){
    return this.studentService.remove(id);
  }
}
