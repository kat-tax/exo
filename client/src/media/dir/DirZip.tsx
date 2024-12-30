import {EntryZip} from 'media/dir/EntryZip';
import type {Zip} from 'media/hooks/useFileZip';

export interface DirZipProps {
  zip: Zip,
  extract: (entry: Zip['list'][number]) => void,
}

export function DirZip({zip, extract}: DirZipProps) {
  return zip.list.map(entry =>
    <EntryZip
      key={entry.name}
      {...{entry, zip, extract}}
    />
  );
}
