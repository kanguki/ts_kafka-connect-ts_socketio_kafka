import config from "../config";

export default function toCompleteUrl(uri: string) {
  return `${config.proxy.baseUrl}:${config.proxy.port}${uri}`
}