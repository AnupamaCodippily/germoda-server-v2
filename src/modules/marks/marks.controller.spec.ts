import { Test, TestingModule } from '@nestjs/testing';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';

describe('MarksController', () => {
  let controller: MarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarksController],
      providers: [MarksService],
    }).compile();

    controller = module.get<MarksController>(MarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
