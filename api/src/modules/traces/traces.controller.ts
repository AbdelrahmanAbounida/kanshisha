import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TracesService } from './traces.service';
import { CreateTraceDto } from './dto/create-trace.dto';
import { UpdateTraceDto } from './dto/update-trace.dto';

@Controller('traces')
export class TracesController {
  constructor(private readonly tracesService: TracesService) {}

  @Post()
  create(@Body() createTraceDto: CreateTraceDto) {
    return this.tracesService.create(createTraceDto);
  }

  @Get()
  findAll() {
    return this.tracesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTraceDto: UpdateTraceDto) {
    return this.tracesService.update(+id, updateTraceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracesService.remove(+id);
  }
}
