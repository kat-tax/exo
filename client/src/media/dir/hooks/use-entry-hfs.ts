import {useRef, useState, useEffect} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useSet} from 'app/data';
import {toPath} from 'app/lib/formatting';
import * as _ from 'app/lib/dragdrop';
import * as $ from 'media/utils/entry';
import media from 'media/store';

import {is as isZip} from './use-entry-zip';
import {is as isTorrent} from './use-entry-torrent';

import type {HfsCmd, HfsFileEntry} from 'media/dir/types/hfs';
import type {EntryHfsProps} from 'media/dir/stacks/entry-hfs';
import type {CleanupFn} from 'app/lib/dragdrop';
import type * as RN from 'react-native';

export const {is, get, type} = $.tag<HfsFileEntry, HfsCmd>('hfs');

export function useEntryHfs({item, cmd, opt}: EntryHfsProps) {
  const [dropping, setDropping] = useState(false);
  const ref = useRef<RN.GestureResponderEvent>(undefined);
  const set = useSet();

  // Spatial navigation
  const {focused, ref: refFoc, focusSelf: foc} = useFocusable({
    onFocus: (_lay, _props, e) =>
      ref.current = e.event as unknown as RN.GestureResponderEvent,
    onArrowRelease: () => {
      if (opt.preview) return true;
      cmd.select(item, ref.current);
      ref.current = undefined;
      return true;
    },
    onEnterPress: () => opt.preview
      ? cmd.select(item)
      : item.isDirectory
        ? cmd.open(item)
        : cmd.select(item),
    onArrowPress: (dir) => {
      if (opt.preview) return true;
      // Handle navigating to top-level (left arrow)
      if (dir === 'left') {
        return !cmd.goUp();
      // Handle navigating into sub-directory (right arrow)
      } else if (dir === 'right' && item.isDirectory) {
        cmd.open(item);
        return false;
      }
      return true;
    },
  });

  // Focus on renaming
  useEffect(() => {
    if (opt.renaming) foc();
  }, [opt.renaming, foc]);

  // Drag and drop
  const refDnd = useRef<RN.View>(null);
  useEffect(() => {
    if (!refDnd.current) return;
    const element = refDnd.current as unknown as HTMLElement;
    return _.combine(...[
      _.draggable({
        element,
        getInitialData: () => get(item, cmd),
        onGenerateDragPreview: _.dragPreview(opt.selected?.count ?? 1),
        onDragStart: () => set(media.actions.drag(item.name)),
        onDrop: () => set(media.actions.drag(null)),
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
  }, [item, cmd, opt.selected?.count, set]);

  return {
    ext: toPath(item.name, item.isDirectory)?.ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused, dropping},
    ref: [refDnd, refFoc],
    foc,
  };
}
