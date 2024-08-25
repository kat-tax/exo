
import Torrent from 'react-exo/torrent';

import {useCallback, useMemo} from 'react';
import {useFileData} from 'media/hooks/useFileData';
import {info, files} from 'media/utils/torrent';
import {bytesize} from 'app/utils/formatting';

import type {TorrentInfo, TorrentFileData} from 'media/utils/torrent';

export function useFileTorrent(path: string) {
  const buffer = useFileData(path, 'arrayBuffer');

  const torrent = useMemo(() => {
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
      name: getName(_info, _data),
      desc: getDesc(_info),
      list: getList(_data),
    };
  }, [buffer, path]);

  const download = useCallback((file: TorrentFileData['files'][number]) => {
    if (!torrent) return;
    const client = new Torrent();
    client.add(torrent.file, async (torrent) => {
      const target = torrent.files.find((e) =>
        e.path.split('/').slice(1).join('/') === file.path);
      const folder = await navigator.storage.getDirectory();
      const handle = await folder.getFileHandle(file.name, {create: true});
      const stream = await handle.createWritable();
      // @ts-ignore
      const source = target?.stream();
      source?.pipeTo(stream);
    });
  }, [torrent]);

  return {torrent, download};
}

const getName = (info: TorrentInfo, data: TorrentFileData) =>
  `${info.name} – ${bytesize(data?.length ?? 0)}`;

const getDesc = (info: TorrentInfo) => info.comment
? `${info.createdBy} – ${info.comment}`
: info.createdBy;

const getList = (data: TorrentFileData) =>
  data.files.filter(e => !e.path.split('/')[0]?.startsWith('.____'));
