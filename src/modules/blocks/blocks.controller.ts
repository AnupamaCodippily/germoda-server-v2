import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STUDENT_AUTH_LOCAL} from 'src/constants/auth-strategy-names'
import { ADMIN_AUTH_JWT } from 'src/constants/auth-strategy-names';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';


@UseGuards(AuthGuard(ADMIN_AUTH_JWT))
@Controller('/api/blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Get()
  findAll() {
    return this.blocksService.findAll();
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.update(+id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blocksService.remove(+id);
  }
}
