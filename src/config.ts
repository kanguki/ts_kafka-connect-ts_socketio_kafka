const config = {
  kafka: {
    producer: {
      id: process.env.kafkaProducerId || 'gateway',
      brokerList: process.env.kafkaProducerBrokerList || 'localhost:9092',
      enableIndempotence: true,
      dr_cb: true,
      defaultTopic: 'second',
    },
    consumer: {
      groupId: 'gatewayConsumer',
      brokerList: process.env.kafkaConsumerBrokerList || 'localhost:9092',
      topics: ['first'],
    },
  },
  proxy: {
    baseUrl: "http://localhost:3001",
    port: 3001

  },
  redis: {
    uri: 'redis://localhost:6379'
  }
};
export default config;
