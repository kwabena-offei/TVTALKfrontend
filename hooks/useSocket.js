'use client';

import { useEffect, useRef } from 'react'
import getConfig from "next/config";
import {TV_TALK_WEBSOCKET_LOCAL, TV_TALK_WEBSOCKET} from "../util/constants";

let ws = {}
export default function useSocket(eventName, channel, params, cb) {
  const isLoaded = useRef(false);
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    // trick for preventing triggering useEffect 2 times
    if (isLoaded.current)
      return
    isLoaded.current = true

    ws = new WebSocket(publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_WEBSOCKET_LOCAL : TV_TALK_WEBSOCKET);
    ws.onopen = function(){
      //Subscribe to the channel
      let identifier = {
        "channel": channel,
        ...params
      }
      let payload = {
        "command": "subscribe",
        "identifier": JSON.stringify(identifier)
      }
      // console.log('[WebSocket][open]: ', payload);
      ws.send(JSON.stringify(payload));
    }

    ws.onmessage = function(msg) {
      let json = JSON.parse(msg.data)
      cb(json);
    }

    ws.onerror = (err) => {
      console.log('[WebSocket][error]', err);
    }

    ws.onclose = function(msg) {
      console.log('[WebSocket][close]', msg);
      // let json = JSON.parse(msg.data)
    }

    return () => {
      if (ws && ws.close) {
        ws.close();
      }
      console.log('unsubscribe')
    }
  }, [eventName, cb]);

  return ws;
}