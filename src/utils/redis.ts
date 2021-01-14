import {Commands, createClient, RedisClient} from "redis";
// import { createNodeRedisClient,WrappedNodeRedisClient } from 'handy-redis';
import config from "../config";
import {logger} from "./log";

type T = object|string|number|boolean;
// let client: Commands<T>;
let client: RedisClient;

export function prepareRedis() {
  client = createClient(config.redis.uri);
  client.on('connect',()=>logger.info('Redis connected'));
  client.on('end',()=>logger.warn('Redis disconnected'));
  return client;
}
export function getRedisClient(): RedisClient {
  return client;
}