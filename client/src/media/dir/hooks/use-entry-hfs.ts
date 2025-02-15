import {useRef, useState, useEffect} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {usePut} from 'app/data/store';
import {toPath} from 'app/utils/formatting';
import * as _ from 'app/utils/dragdrop';
import * as $ from 'media/utils/entry';
import media from 'media/store';

import {is as isZip} from './use-entry-zip';
import {is as isTorrent} from './use-entry-torrent';

import type {View, GestureResponderEvent} from 'react-native';
import type {HfsCmd, HfsFileEntry} from 'media/dir/types/hfs';
import type {EntryHfsProps} from 'media/dir/stacks/entry-hfs';
import type {CleanupFn} from 'app/utils/dragdrop';

export const {is, get, type} = $.tag<HfsFileEntry, HfsCmd>('hfs');

export function useEntryHfs({item, cmd, opt, tmp}: EntryHfsProps) {
  const [dropping, setDropping] = useState(false);
  const put = usePut();
  
  // Spatial navigation
  const {focused, ref: refFoc, focusSelf: foc} = useFocusable({
    onFocus: (_lay, _props, e) => tmp
      ? undefined
      : cmd.select(item, e.event as unknown as GestureResponderEvent),
    onEnterPress: () => tmp
      ? cmd.select(item)
      : item.isDirectory
        ? cmd.open(item)
        : cmd.select(item),
    onArrowPress: (dir) => {
      if (dir !== 'left' || tmp) return true;
      if (cmd.goUp()) return false;
      return true;
    },
  });
  
  // Drag and drop
  const refDnd = useRef<View>(null);
  useEffect(() => {
    if (!refDnd.current) return;
    const element = refDnd.current as unknown as HTMLElement;
    return _.combine(...[
      _.draggable({
        element,
        getInitialData: () => get(item, cmd),
        onGenerateDragPreview: _.dragPreview(opt.selected.count),
        onDragStart: () => put(media.actions.drag(item.name)),
        onDrop: () => put(media.actions.drag(null)),
      }),
      item.isDirectory && _.dropTargetForElements({
        element,
        canDrop: ({source}) => source.element !== element && (
             is(source.data)
          || isZip(source.data)
          || isTorrent(source.data)
        ),
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const {data} = e.source;
          if (is(data)) {
            cmd.move(data.entry, item);
          } else if (isZip(data)) {
            data.cmd.extract(data.entry, undefined, item);
          } else if (isTorrent(data)) {
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
    ext: toPath(item.name, item.isDirectory)?.ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused, dropping},
    ref: [refDnd, refFoc],
    foc,
  };
}
