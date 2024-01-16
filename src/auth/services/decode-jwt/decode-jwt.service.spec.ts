import { Test, TestingModule } from '@nestjs/testing';
import { DecodeJwtService } from './decode-jwt.service';

describe('DecodeJwtService', () => {
  let service: DecodeJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecodeJwtService],
    }).compile();

    service = module.get<DecodeJwtService>(DecodeJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
