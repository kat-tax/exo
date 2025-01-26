import {useMemo, useEffect} from 'react';
import {RoomEvent} from 'matrix-js-sdk/lib/models/room';
import * as sdk from 'matrix-js-sdk';

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
  ], []);

  const client = useMemo(() => {
    const userId = '@theultdev_:matrix.org';
    const accessToken = 'syt_dGhldWx0ZGV2Xw_jkOZPjNeFfKRKdlJOTVg_4RK4V4';
    return sdk.createClient({
      userId,
      accessToken,
      baseUrl: 'https://matrix.org',
    });
  }, []);

  useEffect(() => {
    if (!client) return;
    console.log('>> client', client);
    client.startClient();
    client.on(RoomEvent.Name, (room) => {
      console.log('>> [matrix] [RoomEvent.Name]', room);
    });
    client.on(RoomEvent.Tags, (event, room) => {
      console.log('>> [matrix] [RoomEvent.Tags]', event, room);
    });
    client.on(RoomEvent.Receipt, (event, room) => {
      console.log('>> [matrix] [RoomEvent.Receipt]', event, room);
    });
    client.on(RoomEvent.Redaction, (event, room, threadId) => {
      console.log('>> [matrix] [RoomEvent.Redaction]', event, room, threadId);
    });
    client.on(RoomEvent.RedactionCancelled, (event, room) => {
      console.log('>> [matrix] [RoomEvent.RedactionCancelled]', event, room);
    });
    client.on(RoomEvent.AccountData, (event, room) => {
      console.log('>> [matrix] [RoomEvent.AccountData]', event, room);
    });
    client.on(RoomEvent.MyMembership, (room, membership, oldMembership) => {
      console.log('>> [matrix] [RoomEvent.MyMembership]', room, membership, oldMembership);
    });
    client.on(RoomEvent.LocalEchoUpdated, (event, room, oldEventId, oldStatus) => {
      console.log('>> [matrix] [RoomEvent.LocalEchoUpdated]', event, room, oldEventId, oldStatus);
    });
    client.on(RoomEvent.HistoryImportedWithinTimeline, (markerEvent, room) => {
      console.log('>> [matrix] [RoomEvent.HistoryImportedWithinTimeline]', markerEvent, room);
    });
    client.on(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
      if (toStartOfTimeline) {
          return; // don't print paginated results
      }
      if (event.getType() !== "m.room.message") {
          return; // only print messages
      }
      console.log(
          // the room name will update with m.room.name events automatically
          ">> [matrix] [RoomEvent.Timeline] message: (%s) %s :: %s",
          room?.name,
          event.getSender(),
          event.getContent().body,
      );
    });
    return () => {
      client.removeAllListeners();
      client.stopClient();
    };
  }, [client]);

  return list.map((msg, i) => ({
    ...msg,
    hasPrev: i > 0 && list[i - 1].local === msg.local && !msg.embed && !list[i - 1].embed,
    hasNext: i < list.length - 1 && list[i + 1].local === msg.local && !msg.embed && !list[i + 1].embed
  }));
}