import {joinRoom as joinRoomIpfs} from 'trystero/torrent';
import cfg from 'config';

import type {Room} from 'trystero';

export type FileMetadata = {name: string, type: string};

export function join(channel: string, password?: string) {
  return joinRoomIpfs({
    appId: cfg.APP_NAME,
    password,
  }, channel);
}

export function buffer(
  room: Room,
  buffer: Buffer,
  metadata: FileMetadata,
  progress: (
    percent: number,
    peerId: string,
    metadata?: FileMetadata,
  ) => void
) {
  const [send, get] = room.makeAction('file');

  send(buffer, null, metadata, (percent, peerId) => {
    progress(percent, peerId, metadata);
  });

  return get;
}
