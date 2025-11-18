import {useRef} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {toPath} from 'app/lib/formatting';
import * as _ from 'app/lib/dragdrop';
import * as $ from 'media/utils/entry';

import type {DirEvoluCmd, DirEvoluEntry} from 'media/dir/types/evolu';
import type {EntryEvoluProps} from 'media/dir/stacks/entry-evolu';
import type * as RN from 'react-native';

export const {is, get, type} = $.tag<DirEvoluEntry, DirEvoluCmd>('evolu');

export function useEntryEvolu({item, cmd, opt}: EntryEvoluProps) {
  const ref = useRef<RN.GestureResponderEvent>(undefined);

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
      }
      return true;
    },
  });

  return {
    ext: toPath(item.name, item.isDirectory)?.ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused},
    ref: [refFoc],
    foc,
  };
}
