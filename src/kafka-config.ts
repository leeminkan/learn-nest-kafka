import {
  ClientProviderOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const kafkaClientConfig: ClientProviderOptions = {
  name: 'HERO_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'hero',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'hero-consumer',
      allowAutoTopicCreation: true,
      maxBytesPerPartition: 1000,
    },
    postfixId: '',
    // producerOnlyMode: true
  },
};

export const kafkaServerConfig: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'hero',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'hero-consumer',
      allowAutoTopicCreation: true,
      maxBytesPerPartition: 1000,
    },
    postfixId: '',
  },
};
