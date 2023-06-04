import { Test, TestingModule } from '@nestjs/testing';
import { MqttModuleService } from './mqtt-module.service';

describe('MqttModuleService', () => {
  let service: MqttModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttModuleService],
    }).compile();

    service = module.get<MqttModuleService>(MqttModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
