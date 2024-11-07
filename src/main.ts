import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaServerConfig } from './kafka-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(kafkaServerConfig);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
