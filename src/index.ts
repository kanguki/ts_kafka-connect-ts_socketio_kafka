import {getKafkaConsumer, prepareKafka} from "./utils/kafka";
import handleRequest, {sendKafka} from "./constroller/router";
import {prepareRedis} from "./utils/redis";
import {logger} from "./utils/log";


prepareKafka();
prepareRedis();
const consumer = getKafkaConsumer();

consumer.on('data', (data: any)=>{
  logger.info(data.value)
  handleRequest(data.value.uri, data.value.method === 'post' ? data.value.body : null).then((res: any)=>
    sendKafka(res))
});