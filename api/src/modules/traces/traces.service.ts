import { Injectable } from '@nestjs/common';
import { CreateTraceDto } from './dto/create-trace.dto';
import { UpdateTraceDto } from './dto/update-trace.dto';

@Injectable()
export class TracesService {
  create(createTraceDto: CreateTraceDto) {
    return 'This action adds a new trace';
  }

  findAll() {
    return `This action returns all traces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trace`;
  }

  update(id: number, updateTraceDto: UpdateTraceDto) {
    return `This action updates a #${id} trace`;
  }

  remove(id: number) {
    return `This action removes a #${id} trace`;
  }
}
