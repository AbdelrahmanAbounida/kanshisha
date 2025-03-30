import { Module } from '@nestjs/common';
import { TracesService } from './traces.service';
import { TracesController } from './traces.controller';

@Module({
  controllers: [TracesController],
  providers: [TracesService],
})
export class TracesModule {}
