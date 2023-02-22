import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OnlineClassService } from './online-class.service';
import { CreateOnlineClassDto } from './dto/create-online-class.dto';
import { UpdateOnlineClassDto } from './dto/update-online-class.dto';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_JWT, STUDENT_AUTH_LOCAL } from 'src/constants/auth-strategy-names';

@UseGuards(AuthGuard(ADMIN_AUTH_JWT))
@Controller('api/online-class')
export class OnlineClassController {
  constructor(private readonly onlineClassService: OnlineClassService) {}

  @Post()
  create(@Body() createOnlineClassDto: CreateOnlineClassDto) {
    return this.onlineClassService.create(createOnlineClassDto);
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Get()
  findAll() {
    return this.onlineClassService.findAll();
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlineClassService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOnlineClassDto: UpdateOnlineClassDto,
  ) {
    return this.onlineClassService.update(id, updateOnlineClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlineClassService.remove(id);
  }
}
