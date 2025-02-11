import {useRef, useState, useEffect} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useDispatch} from 'react-redux';
import {toPathInfo} from 'app/utils/formatting';
import * as _ from 'app/utils/dragdrop';
import {bind} from 'media/utils/bind';
import media from 'media/store';

import {isZipData} from './use-entry-zip';
import {isTorrentData} from './use-entry-torrent';

import type {View} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {EntryHfsProps} from 'media/dir/stacks/entry-hfs';
import type {CleanupFn} from 'app/utils/dragdrop';

const $ = Symbol('hfs');
export type HfsData = {[$]: true, entry: HfsDirectoryEntry};
export const isHfsData = (data: Record<string | symbol, unknown>): data is HfsData => data[$] === true;
export const getHfsData = (entry: HfsDirectoryEntry): HfsData => ({[$]: true, entry});

export function useEntryHfs({item, cmd, opt, tmp}: EntryHfsProps) {
  const [dropping, setDropping] = useState(false);
  const put = useDispatch();
  
  // Spatial navigation
  const {focused, ref: refFoc} = useFocusable({
    onFocus: () => tmp
      ? undefined
      : cmd.select(item),
    onEnterPress: () => tmp
      ? cmd.select(item)
      : cmd.open(item),
  });
  
  // Drag and drop
  const refDnd = useRef<View>(null);
  useEffect(() => {
    if (!refDnd.current) return;
    const element = refDnd.current as unknown as HTMLElement;
    return _.combine(...[
      _.draggable({
        element,
        getInitialData: () => getHfsData(item),
        onGenerateDragPreview: _.dragPreview(opt.selected.count),
        onDragStart: () => put(media.actions.drag(item.name)),
        onDrop: () => put(media.actions.drag(null)),
      }),
      item.isDirectory && _.dropTargetForElements({
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
      item.isDirectory && _.dropTargetForExternal({
        element,
        canDrop: _.containsFiles,
        getDropEffect: () => 'copy',
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const files = _.getFiles(e);
          if (files.length) {
            cmd.upload(item, files);
          }
        },
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [item, cmd, opt.selected.count, put]);

  return {
    ext: toPathInfo(item.name, item.isDirectory)?.ext,
    cmd: bind(cmd, item),
    opt: {...opt, focused, dropping},
    ref: [refDnd, refFoc],
  };
}
