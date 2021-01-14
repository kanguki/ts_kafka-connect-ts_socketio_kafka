import {getRedisClient} from "../utils/redis";
import {RedisClient} from "redis";
import {getKafkaProducer} from "../utils/kafka";
import config from "../config";
import {logger} from "../utils/log";

export default async function handleRequest(uri: string, body?: object ) {
  const redisClient: RedisClient = getRedisClient();
  let res: any;
  if (!body) {
    switch(uri){
      case '/foo':
        res = await redisClient.get("foo");
        console.log(res);
        break;
      default:
        return (await redisClient.get("undefined"))
    }
  }
  return await redisClient.get("test");
  // return res;
}

export function sendKafka(data: any):void {
  if (typeof data === 'boolean') data = 'redis return boolean type';
  const msgToSend:object = {data};
  logger.info(`Send msg: ${JSON.stringify(msgToSend)} to topic ${config.kafka.producer.defaultTopic}`);
  const kafkaProducer = getKafkaProducer();
  kafkaProducer.produce(config.kafka.producer.defaultTopic, null, Buffer.from(JSON.stringify(msgToSend)), 'mo', Date.now(), (err,offset)=>{
      if(err) console.log(err);
      console.log(offset)
    }
  )
}