import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// export class SocketAdapter extends IoAdapter {
//   createIOServer(
//     port: number,
//     options?: ServerOptions & {
//       namespace?: string;
//       server?: any;
//     },
//   ) {
//     const server = super.createIOServer(port, {
//       ...options,
//     });
//     return server;
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://mosquitto:1883',
    },
  });

  await app.startAllMicroservices();

  // app.useWebSocketAdapter(new SocketAdapter(app));
  await app.listen(process.env.PORT);
}
bootstrap();
