import {EntryZip} from 'media/dir/EntryZip';
import type {Zip} from 'media/hooks/useFileZip';

export interface DirZipProps {
  zip: Zip,
  extract: (entry: Zip['list'][number]) => void,
}

export function DirZip({zip, extract}: DirZipProps) {
  return zip.list.map((entry, index) =>
    <EntryZip
      key={entry.dir ? `.${entry.name}` : entry.name}
      {...{entry, index, zip, extract}}
    />
  );
}
