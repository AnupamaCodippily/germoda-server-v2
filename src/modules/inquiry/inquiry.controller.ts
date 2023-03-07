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
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_JWT } from 'src/constants/auth-strategy-names';

@UseGuards(AuthGuard(ADMIN_AUTH_JWT))
@Controller('/api/inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiryService.create(createInquiryDto);
  }

  @Get()
  findAll() {
    return this.inquiryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inquiryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInquiryDto: UpdateInquiryDto) {
    return this.inquiryService.update(+id, updateInquiryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inquiryService.remove(+id);
  }
}
