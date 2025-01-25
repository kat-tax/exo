import {useMemo} from 'react';

export interface Message {
  local: boolean;
  message: string;
  timestamp: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  emote?: string;
  embed?: string;
}

export function useMessages(): Array<Message> {
  const list = useMemo(() => [
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
  ], []);

  return list.map((msg, i) => ({
    ...msg,
    hasPrev: i > 0 && list[i - 1].local === msg.local && !msg.embed && !list[i - 1].embed,
    hasNext: i < list.length - 1 && list[i + 1].local === msg.local && !msg.embed && !list[i + 1].embed
  }));
}