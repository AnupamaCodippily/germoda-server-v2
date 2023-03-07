import { Injectable } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Injectable()
export class MarksService {
  create(createMarkDto: CreateMarkDto) {
    return 'This action adds a new mark';
  }

  findAll() {
    return `This action returns all marks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mark`;
  }

  update(id: number, updateMarkDto: UpdateMarkDto) {
    return `This action updates a #${id} mark`;
  }

  remove(id: number) {
    return `This action removes a #${id} mark`;
  }
}
