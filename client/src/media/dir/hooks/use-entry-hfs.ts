import {useRef, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {toPathInfo} from 'app/utils/formatting';
import * as dnd from 'app/utils/dragdrop';
import {bind} from 'media/utils/bind';
import media from 'media/store';

import {isZipData} from './use-entry-zip';
import {isTorrentData} from './use-entry-torrent';

import type {View} from 'react-native';
import type {CleanupFn} from 'app/utils/dragdrop';
import type {EntryHfsProps} from 'media/dir/stacks/entry-hfs';
import type {HfsDirectoryEntry} from 'react-exo/fs';

const $ = Symbol('hfs');
export type HfsData = {[$]: true, entry: HfsDirectoryEntry};
export const isHfsData = (data: Record<string | symbol, unknown>): data is HfsData => data[$] === true;
export const getHfsData = (entry: HfsDirectoryEntry): HfsData => ({[$]: true, entry});

export function useEntryHfs({item, cmd, opt}: EntryHfsProps) {
  const [dropping, setDropping] = useState(false);
  const ext = toPathInfo(item.name, item.isDirectory)?.ext;
  const ref = useRef<View>(null);
  const put = useDispatch();

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return dnd.combine(...[
      dnd.draggable({
        element,
        getInitialData: () => getHfsData(item),
        onGenerateDragPreview: dnd.dragPreview(opt.selected.count),
        onDragStart: () => put(media.actions.drag(item.name)),
        onDrop: () => put(media.actions.drag(null)),
      }),
      item.isDirectory && dnd.dropTargetForElements({
        element,
        canDrop: ({source}) => source.element !== element && (
             isHfsData(source.data)
          || isZipData(source.data)
          || isTorrentData(source.data)
        ),
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const {data} = e.source;
          if (isHfsData(data)) {
            cmd.move(data.entry, item);
          } else if (isZipData(data)) {
            data.cmd.extract(data.entry, undefined, item);
          } else if (isTorrentData(data)) {
            data.cmd.download(data.entry, undefined, item);
          }
        },
      }),
      item.isDirectory && dnd.dropTargetForExternal({
        element,
        canDrop: dnd.containsFiles,
        getDropEffect: () => 'copy',
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const files = dnd.getFiles(e);
          if (files.length) {
            cmd.upload(item, files);
          }
        },
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [item, cmd]);

  return {
    ref,
    ext,
    cmd: bind(cmd, item),
    opt: {...opt, dropping},
  };
}
