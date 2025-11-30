import {web, bytesize} from 'react-exo/fs';
import {useCallback, useMemo} from 'react';
import {useSet} from 'app/data';
import {useFile} from 'media/file/hooks/use-file';
import {getTargetPath} from 'media/dir/utils/path';
import * as tor from 'media/dir/utils/torrent/info';
import Tor from 'media/dir/utils/torrent/lib';
import store from 'media/dir/utils/torrent/chunkstore';
import media from 'media/store';

import type {Torrent, TorrentCtx, TorrentInfo, TorrentFileData, TorrentFileEntry} from 'media/dir/types/torrent';
import type {GestureResponderEvent} from 'react-native';
import type {HfsFileEntry} from 'media/dir/types/hfs';

export function useDirTorrent(path: string): TorrentCtx {
  const buffer = useFile(path, 'arrayBuffer');
  const set = useSet();

  const torrent: Torrent | null = useMemo(() => {
    if (!buffer) return null;
    const name = path.split('/').pop();
    const view = new Uint8Array(buffer);
    const file = new File([view], name ?? '');
    const info = tor.info(view);
    const data = tor.files(view);
    return {
      file,
      info,
      data,
      list: getList(data),
      name: getName(info, data),
      desc: getDesc(info),
    } satisfies Torrent;
  }, [buffer, path]);

  const download = useCallback(async (
    file: TorrentFileEntry,
    event?: GestureResponderEvent,
    target?: HfsFileEntry,
  ) => {
    if (!torrent) return;
    const client = new Tor();
    // @ts-expect-error Incorrect vendor types
    client.add(torrent.file, {store}, async ({files}) => {
      const item = files.find((e: TorrentFileEntry) => e.path.split('/').slice(1).join('/') === file.path);
      const dest = getTargetPath(path, file.path, target?.name);
      const handle = await web.getFileHandle(dest, {create: true});
      const writable = await handle?.createWritable();
      if (!writable) return;
      const source = item?.stream();
      source?.pipeTo(writable);
      console.log('>> torrent [download]', file.path, '->', dest);
    });
    // Open file on gesture event
    if (event) {
      const [isShift, isCtrl] = [
        event?.shiftKey,
        event?.metaKey || event?.ctrlKey,
      ];
      set(media.actions.selectItem({
        path: getTargetPath(path, file.path, target?.name),
        isRange: isShift ?? false,
        isMulti: isCtrl ?? false,
        list: torrent.list.map(e => e.path),
      }));
    }
  }, [torrent, path, set]);

  return {
    torrent,
    cmd: {download},
  };
}

const getName = (info: TorrentInfo, data: TorrentFileData) =>
  `${info.name} – ${bytesize(data?.length ?? 0)}`;

const getDesc = (info: TorrentInfo) => info.comment
? `${info.createdBy} – ${info.comment}`
: info.createdBy;

const getList = (data: TorrentFileData) =>
  data.files.filter(e => !e.path.split('/')[0]?.startsWith('.____'));
