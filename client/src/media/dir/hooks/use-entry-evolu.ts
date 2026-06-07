import {useRef} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {getPathInfo} from 'media/dir/utils/path';
import * as _ from 'app/lib/dragdrop';
import * as $ from 'media/utils/entry';

import type {DirEvoluCmd, DirEvoluEntry} from 'media/dir/types/evolu';
import type {EntryEvoluProps} from 'media/dir/stacks/entry-evolu';
import type * as RN from 'react-native';

export const {is, get, type} = $.tag<DirEvoluEntry, DirEvoluCmd>('evolu');

export function useEntryEvolu({item, index, cmd, opt}: EntryEvoluProps) {
  const focusRef = useRef<RN.GestureResponderEvent>(undefined);
  const itemRef = useRef<DirEvoluEntry>(item);
  const indexRef = useRef<number>(index);

  // Spatial navigation
  // Note: that refs are needed to avoid stale closures
  itemRef.current = item;
  indexRef.current = index;
  const {focused, ref: refFoc, focusSelf: foc} = useFocusable({
    focusKey: opt.preview ? `preview-${indexRef.current}` : `list-${indexRef.current}`,
    onFocus: (_lay, _props, e) => {
      focusRef.current = e.event as unknown as RN.GestureResponderEvent;
    },
    onArrowRelease: () => {
      if (opt.preview) return true;
      //cmd.select(itemRef.current, focusRef.current);
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

  return {
    ext: getPathInfo(item.name, item.isDirectory).ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused},
    ref: [refFoc],
    foc,
  };
}
