import { Test, TestingModule } from '@nestjs/testing';
import { TracesController } from '../traces.controller';
import { TracesService } from '../traces.service';

describe('TracesController', () => {
  let controller: TracesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracesController],
      providers: [TracesService],
    }).compile();

    controller = module.get<TracesController>(TracesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
