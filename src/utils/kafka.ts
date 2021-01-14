import {HighLevelProducer, KafkaConsumer} from 'node-rdkafka';
import config from '../config';
import {logger} from "./log";
const kafkaProducer: HighLevelProducer = new HighLevelProducer({
  'client.id': config.kafka.producer.id,
  'metadata.broker.list': config.kafka.producer.brokerList,
  'enable.idempotence': config.kafka.producer.enableIndempotence,
  dr_cb: config.kafka.producer.dr_cb,
});
const kafkaConsumer: KafkaConsumer = new KafkaConsumer(
  {
    'group.id': config.kafka.consumer.groupId,
    'metadata.broker.list': config.kafka.consumer.brokerList,
  },
  {}
);
export const prepareKafka: () => void = () => {
  kafkaProducer.connect();
  kafkaConsumer.connect();
  kafkaProducer.on('ready', () => logger.info('Producer is ready'));
  kafkaProducer.setPollInterval(100);
  kafkaProducer.on('disconnected', () => logger.warn('Kafka Producer disconnected'));

  kafkaConsumer.on('ready', () => {
    logger.info('Consumer is ready');
    kafkaConsumer.subscribe(config.kafka.consumer.topics);
    kafkaConsumer.consume();
  });
};
export const getKafkaProducer = (): HighLevelProducer => {
  return kafkaProducer;
};
export const getKafkaConsumer = (): KafkaConsumer => {
  return kafkaConsumer;
};
