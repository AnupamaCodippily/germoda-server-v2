import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_JWT, STUDENT_AUTH_LOCAL } from 'src/constants/auth-strategy-names';

@UseGuards(AuthGuard(ADMIN_AUTH_JWT))
@Controller('/api/marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  create(@Body() createMarkDto: CreateMarkDto) {
    return this.marksService.create(createMarkDto);
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Get()
  findAll() {
    return this.marksService.findAll();
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkDto: UpdateMarkDto) {
    return this.marksService.update(+id, updateMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marksService.remove(+id);
  }
}
