import {EntryZip} from 'media/dir/stacks/entry-zip';
import type {ZipCtx} from 'media/dir/types/zip';

export function DirZip({zip, cmd}: ZipCtx) {
  return zip?.list.map((entry, idx) =>
    <EntryZip
      key={entry.dir ? `.${entry.name}` : entry.name}
      opt={{}}
      {...{entry, cmd, idx}}
    />
  );
}
