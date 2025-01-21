import {HfsEntry} from './HfsEntry';
import type {HfsCtx} from '../types';

export function HfsDir({hfs, cmd, sel}: HfsCtx) {
  return hfs.list.map((entry, idx) => {
    const path = hfs.path ? `${hfs.path}/${entry.name}` : entry.name;
    const opt = {
      selected: sel?.includes(path),
    };
    return (
      <HfsEntry
        key={entry.isDirectory ? `.${entry.name}` : entry.name}
        {...{entry, cmd, idx, opt}}
      />
    );
  });
}
