import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
      username: 'console',
      password: 'console',
      retain: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
