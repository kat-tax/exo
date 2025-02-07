import ExoTorrent from 'react-exo/torrent';
import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useFileData} from 'media/file/hooks/useFileData';
import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {bytesize} from 'app/utils/formatting';
import * as tor from '../utils/info';
import store from '../utils/chunkstore';
import media from 'media/store';

import type {Torrent, TorrentCtx, TorrentInfo, TorrentFileData, TorrentFileEntry} from '../types';
import type {GestureResponderEvent} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';

export function useTorrent(path: string): TorrentCtx {
  const buffer = useFileData(path, 'arrayBuffer');
  const {path: url} = useLocationPathInfo();
  const put = useDispatch();

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
    target?: HfsDirectoryEntry,
  ) => {
    if (!torrent) return;
    const client = new ExoTorrent();
    // @ts-expect-error Incorrect vendor types
    client.add(torrent.file, {store}, async ({files}) => {
      const item = files.find(e => e.path.split('/').slice(1).join('/') === file.path);
      const root = await navigator.storage.getDirectory();
      const dest = file.name; // const dest = path ? `${path}/${filename}` : filename;
      const handle = await root.getFileHandle(dest, {create: true});
      const stream = await handle.createWritable();
      // @ts-expect-error TS missing types
      const source = item?.stream();
      source?.pipeTo(stream);
    });
    // Open file on gesture event
    if (event) {
      const [isShift, isCtrl] = [
        event?.shiftKey,
        event?.metaKey || event?.ctrlKey,
      ];
      put(media.actions.selectItem({
        path: url ? `${url}/${file.name}` : file.name,
        isRange: isShift ?? false,
        isMulti: isCtrl ?? false,
      }));
    }
  }, [torrent, url]);

  return {torrent, cmd: {download}};
}

const getName = (info: TorrentInfo, data: TorrentFileData) =>
  `${info.name} – ${bytesize(data?.length ?? 0)}`;

const getDesc = (info: TorrentInfo) => info.comment
? `${info.createdBy} – ${info.comment}`
: info.createdBy;

const getList = (data: TorrentFileData) =>
  data.files.filter(e => !e.path.split('/')[0]?.startsWith('.____'));
