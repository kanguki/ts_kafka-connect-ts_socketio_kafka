import config from "../config";
import http = require("http");
import fetch, { Response } from 'node-fetch';
import toCompleteUrl from "../utils/toCompleteUrl";

export class DoHttpRequest {
  async post<T>(uri: string, body?: object,): Promise<T> {
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const res = await fetch(toCompleteUrl(uri),options);
    return res.json()
  }

  async get<T>(uri: string,cookie?: string): Promise<T> {
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const res = await fetch(toCompleteUrl(uri),options);
    return res.json()
  }
}