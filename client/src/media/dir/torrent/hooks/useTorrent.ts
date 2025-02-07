import ExoTorrent from 'react-exo/torrent';
import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useFileData} from 'media/file/hooks/useFileData';
import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {bytesize} from 'app/utils/formatting';
import {info, files} from '../utils/info';
import store from '../utils/chunkstore';
import media from 'media/store';

import type {Torrent, TorrentCtx, TorrentInfo, TorrentFileData, TorrentFileEntry} from '../types';
import type {GestureResponderEvent} from 'react-native';

export function useTorrent(path: string): TorrentCtx {
  const buffer = useFileData(path, 'arrayBuffer');
  const {path: url} = useLocationPathInfo();
  const put = useDispatch();

  const torrent: Torrent | null = useMemo(() => {
    if (!buffer) return null;
    const _name = path.split('/').pop();
    const _view = new Uint8Array(buffer);
    const _file = new File([_view], _name ?? '');
    const _info = info(_view);
    const _data = files(_view);
    return {
      file: _file,
      info: _info,
      data: _data,
      list: getList(_data),
      name: getName(_info, _data),
      desc: getDesc(_info),
    } satisfies Torrent;
  }, [buffer, path]);

  const download = useCallback(async (file: TorrentFileEntry, evt?: GestureResponderEvent) => {
    if (!torrent) return;
    const client = new ExoTorrent();
    // @ts-expect-error Incorrect vendor types
    client.add(torrent.file, {store}, async ({files}) => {
      const target = files.find(e => e.path.split('/').slice(1).join('/') === file.path);
      const root = await navigator.storage.getDirectory();
      // TODO: move write logic to hfs so recursive mkdir works
      // const dest = path ? `${path}/${filename}` : filename;
      const dest = file.name;
      const handle = await root.getFileHandle(dest, {create: true});
      const stream = await handle.createWritable();
      // @ts-expect-error TS missing types
      const source = target?.stream();
      source?.pipeTo(stream);
    });
    // Open file on gesture event
    if (evt) {
      const [isShift, isCtrl] = [evt?.shiftKey, evt?.metaKey || evt?.ctrlKey];
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
