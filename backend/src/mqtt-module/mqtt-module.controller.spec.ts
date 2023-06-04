import { Test, TestingModule } from '@nestjs/testing';
import { MqttModuleController } from './mqtt-module.controller';

describe('MqttModuleController', () => {
  let controller: MqttModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqttModuleController],
    }).compile();

    controller = module.get<MqttModuleController>(MqttModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
