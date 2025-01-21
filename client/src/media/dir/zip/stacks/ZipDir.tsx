import {ZipEntry} from './ZipEntry';
import type {ZipCtx} from '../types';

export function ZipDir({zip, cmd}: ZipCtx) {
  return zip?.list.map((entry, idx) =>
    <ZipEntry
      key={entry.dir ? `.${entry.name}` : entry.name}
      {...{entry, cmd, idx}}
    />
  );
}
