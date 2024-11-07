import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaClientConfig } from 'src/kafka-config';

@Module({
  imports: [ClientsModule.register([kafkaClientConfig])],
  controllers: [HeroController],
  providers: [],
})
export class HeroModule {}
