import {useEffect, useState} from 'react';
import {useMatrix} from 'app/data/lib/matrix-provider';

export interface Message {
  id: string;
  local: boolean;
  message: string;
  timestamp: number;
  emote?: string;
  embed?: string;
  /* meta */
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function useMessages(): Message[] {
  // const messagesDemo = useMemo(() => DEMO, []);
  const [messages, setMessages] = useState<Message[]>([]);
  const {rooms, users} = useMatrix();

  useEffect(() => {
    console.log('>> rooms', rooms);
    console.log('>> users', users);
    if (!rooms.length) return;
    const target = rooms.find(room => room.id === '!lwpprIOUgIZkrvffNC:matrix.org');
    if (!target) return;
    const messages = target.messages;
    console.log('>> messages', messages);
    setMessages(messages.map((e, i) => {
      const prev = messages[i - 1];
      const next = messages[i + 1];
      const hasPrev = i > 0
        && !e.content.embed
        && !prev.content.embed
        && prev.isSelf === e.isSelf
        && Math.abs(prev.timestamp - e.timestamp) <= 60000;
      const hasNext = i < messages.length - 1
        && !e.content.embed
        && !next.content.embed
        && next.isSelf === e.isSelf
        && Math.abs(next.timestamp - e.timestamp) <= 60000;
      return {
        id: e.id,
        local: e.isSelf,
        message: e.content.body,
        timestamp: e.timestamp,
        // emote: e.content.emote,
        // embed: e.content.embed,
        hasPrev,
        hasNext,
      };
    }));
  }, [rooms, users]);

  return messages;

  // return list.map((msg, i) => ({
  //   ...msg,
  //   hasPrev: i > 0 && list[i - 1].local === msg.local && !msg.embed && !list[i - 1].embed,
  //   hasNext: i < list.length - 1 && list[i + 1].local === msg.local && !msg.embed && !list[i + 1].embed
  // }));
}


const DEMO = [
  {
    local: true, 
    message: 'Check out this cute animated cat I made!',
    timestamp: '2:34 PM',
    embed: 'https://get.ult.dev/samples/cat.lottie',
    emote: '🐱',
  },
  {
    local: false,
    message: 'Aww that\'s adorable! I love the animation',
    timestamp: '2:36 PM',
    emote: '💜',
  },
  {
    local: true,
    message: 'Thanks! I\'ve been learning animation',
    timestamp: '2:36 PM',
  },
  {
    local: true,
    message: 'Lottie is shit.',
    timestamp: '2:37 PM',
  },
  {
    local: true,
    message: 'But no refunds, so fuck it!',
    timestamp: '2:37 PM',
  },
  {
    local: false,
    message: 'Someone made the chrome dino game as a GB rom!',
    timestamp: '2:38 PM',
    embed: 'https://get.ult.dev/samples/dino.gb',
  },
  {
    local: false,
    message: 'Offline dino ftw!',
    timestamp: '2:38 PM',
    emote: '🦖',
  },
  {
    local: true,
    message: 'Oh wow, total throwback! I spent so many hours on that game',
    timestamp: '2:39 PM',
  },
  {
    local: true,
    message: 'Well, here\'s a cute, legal, bunny video to brighten your day!',
    timestamp: '2:40 PM',
    embed: 'https://get.ult.dev/samples/bunny.mp4',
    emote: '🐰',
  },
  {
    local: true,
    message: 'And turing picture incoming!',
    timestamp: '2:41 PM',
    embed: 'https://get.ult.dev/samples/turing.jpg',
  },
  {
    local: false,
    message: 'You always know how to make me smile :)',
    timestamp: '2:41 PM',
    emote: '💜',
  },
];