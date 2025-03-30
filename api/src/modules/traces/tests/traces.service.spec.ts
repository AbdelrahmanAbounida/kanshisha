import { Test, TestingModule } from '@nestjs/testing';
import { TracesService } from '../traces.service';

describe('TracesService', () => {
  let service: TracesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracesService],
    }).compile();

    service = module.get<TracesService>(TracesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
