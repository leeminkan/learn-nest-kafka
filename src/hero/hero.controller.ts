import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller('/hero')
export class HeroController implements OnModuleInit {
  constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) {}

  // @Client(kafkaClientConfig)
  // client: ClientKafka;

  async onModuleInit() {
    // Note: Only for client
    // const requestPatterns = ['entity-created'];
    // requestPatterns.forEach((pattern) => {
    //   this.client.subscribeToResponseOf(pattern);
    // });
    // await this.client.connect();
  }

  @Get()
  getHello(): string {
    // fire event to kafka
    for (let index = 0; index < 4000; index++) {
      this.client.emit<string>('entity-created', 'some entity ' + new Date());
    }
    return 'getHello';
  }

  @Get('/commit-offset')
  async commitOffset() {
    // Note: Not working
    await this.client.commitOffsets([
      { topic: 'entity-created', partition: 0, offset: '3500' },
    ]);
    return 'commit-offset';
  }

  @EventPattern('entity-created')
  async handleEntityCreated(
    @Payload() payload: any,
    @Ctx() context: KafkaContext,
  ) {
    await new Promise((f) => setTimeout(f, 3000));
    const { offset } = context.getMessage();
    console.log(JSON.stringify({ payload, offset }) + ' created');
    this.commitOffsets(context);
    //console.log(payload.value + ' created');
  }

  private async commitOffsets(context: KafkaContext) {
    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();
    console.log('commitOffsets', { topic, partition, offset });

    if (Number(offset) < 3000) {
      // Note: work fine!
      const consumer = context.getConsumer();
      await consumer.commitOffsets([{ topic, partition, offset: '3000' }]);
      await consumer.seek({ topic, partition, offset: '3000' });
    }
  }
}
