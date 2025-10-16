'use client';

import { useEffect, useRef } from 'react'
import getConfig from "next/config";
import {TV_TALK_WEBSOCKET_LOCAL, TV_TALK_WEBSOCKET} from "../util/constants";

export default function useSocket(eventName, channel, params, cb) {
  const wsRef = useRef(null);
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    const wsUrl = publicRuntimeConfig.API_ENV === 'development' ? TV_TALK_WEBSOCKET_LOCAL : TV_TALK_WEBSOCKET;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

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
      console.log('[WebSocket][open]: ', payload);
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
    }

    // Cleanup: unsubscribe and close WebSocket when params change or component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        let identifier = {
          "channel": channel,
          ...params
        }
        let payload = {
          "command": "unsubscribe",
          "identifier": JSON.stringify(identifier)
        }
        console.log('[WebSocket][unsubscribe]', payload);
        ws.send(JSON.stringify(payload));
        ws.close();
      }
    }
  }, [eventName, channel, JSON.stringify(params), cb, publicRuntimeConfig.API_ENV]);

  return wsRef.current;
}