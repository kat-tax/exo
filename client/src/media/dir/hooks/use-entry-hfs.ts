import {useRef, useState, useEffect} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useSet} from 'app/data';
import {getPathInfo} from 'media/dir/utils/path';
import * as _ from 'app/lib/dragdrop';
import * as $ from 'media/utils/entry';
import media from 'media/store';

import {is as isZip} from './use-entry-zip';
import {is as isTorrent} from './use-entry-torrent';

import type {HfsCmd, HfsFileEntry} from 'media/dir/types/hfs';
import type {EntryHfsProps} from 'media/dir/stacks/entry-hfs';
import type {CleanupFn} from 'app/lib/dragdrop';
import type * as RN from 'react-native';

export const {is, get, type} = $.tag<HfsFileEntry[], HfsCmd>('hfs');

export function useEntryHfs({item, index, cmd, opt, dir}: EntryHfsProps) {
  const [dropping, setDropping] = useState(false);
  const focusRef = useRef<RN.GestureResponderEvent>(undefined);
  const itemRef = useRef<HfsFileEntry>(item);
  const set = useSet();

  // Spatial navigation
  // Note: that itemRef is needed to avoid stale closures
  itemRef.current = item;
  const {focused, ref: refFoc, focusSelf: foc} = useFocusable({
    focusKey: opt.preview ? `preview-${index}` : `list-${index}`,
    onFocus: (_lay, _props, e) => {
      focusRef.current = e.event as unknown as RN.GestureResponderEvent;
    },
    onArrowRelease: () => {
      if (opt.preview) return true;
      cmd.select(itemRef.current, focusRef.current);
      focusRef.current = undefined;
      return true;
    },
    onEnterPress: () => opt.preview
      ? cmd.select(itemRef.current)
      : itemRef.current.isDirectory
        ? cmd.open(itemRef.current)
        : cmd.select(itemRef.current),
    onArrowPress: (arrow) => {
      if (opt.preview) return true;
      if (arrow === 'left') {
        return !cmd.goUp();
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
        getInitialData: () => {
          const base = dir.path ? `${dir.path}/` : '';
          const entries = opt.selected?.all?.includes(`${base}${item.name}`)
            && opt.selected?.all?.length > 1
            && dir.list.length > 0
              ? dir.list.filter(e => opt.selected?.all?.includes(`${base}${e.name}`))
              : [item];
          const data = get(entries, cmd);
          return data;
        },
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
        onDrop: async (e) => {
          setDropping(false);
          const {data} = e.source;
          if (is(data)) {
            for (const entry of data.entry) {
              await cmd.move(entry, item);
            }
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
        onDrop: ({source}) => {
          setDropping(false);
          _.droppedFiles(source, async (files) => {
            if (files.length) {
              await cmd.upload(item, files);
              cmd.refresh();
            }
          });
        },
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [item, cmd, dir, opt.selected?.count, opt.selected?.all, set]);

  return {
    ext: getPathInfo(item.name, item.isDirectory).ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused, dropping},
    ref: [refDnd, refFoc],
    foc,
  };
}
