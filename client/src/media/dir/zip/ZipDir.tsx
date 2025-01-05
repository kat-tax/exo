import {ZipEntry} from './ZipEntry';
import type {Zip} from './hooks/useZip';

export interface ZipDirProps {
  zip: Zip,
  extract: (entry: Zip['list'][number]) => void,
}

export function ZipDir({zip, extract}: ZipDirProps) {
  return zip.list.map((entry, index) =>
    <ZipEntry
      key={entry.dir ? `.${entry.name}` : entry.name}
      {...{entry, index, zip, extract}}
    />
  );
}
