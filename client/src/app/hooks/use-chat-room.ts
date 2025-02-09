import {useEffect, useState} from 'react';
import {useMatrix} from 'app/data/lib/matrix-provider';

import type {MatrixMessage} from 'app/data/lib/matrix-store';

const MSG_GROUP_THRESHOLD = 1 * 60 * 1000; // 1 minute

export interface Message extends MatrixMessage {
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function useChatRoom(id?: string): Message[] {
  // const messagesDemo = useMemo(() => DEMO, []);
  const [messages, setMessages] = useState<Message[]>([]);
  const {rooms, users} = useMatrix();

  useEffect(() => {
    console.log('>> rooms', rooms);
    console.log('>> users', users);
    if (!rooms.length) return;
    const target = rooms.find(room => room.id === id);
    if (!target) return;
    const messages = target.messages;
    setMessages(messages.map((event, i) => {
      const prev = messages[i - 1];
      const next = messages[i + 1];
      return {
        ...event,
        hasPrev: i > 0
          && !event.embed
          && !prev.embed
          && prev.self === event.self
          && Math.abs(prev.ts - event.ts) <= MSG_GROUP_THRESHOLD,
        hasNext: i < messages.length - 1
          && !event.embed
          && !next.embed
          && next.self === event.self
          && Math.abs(next.ts - event.ts) <= MSG_GROUP_THRESHOLD,
      }
    }));
  }, [rooms, users]);

  return messages;
}

