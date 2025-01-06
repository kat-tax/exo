import {HfsEntry} from './HfsEntry';
import {useHfs} from '../hooks/useHfs';
import {useHfsHotkeys} from '../hooks/useHfsHotkeys';

export interface HfsDirProps {
  path: string,
}

export function HfsDir(props: HfsDirProps) {
  const {path, entries} = useHfs(props.path, {showHidden: true});
  const {multiSelect} = useHfsHotkeys();
  return entries.map((entry, index) =>
    <HfsEntry
      key={entry.isDirectory ? `.${entry.name}` : entry.name}
      flags={{multiSelect}}
      {...{entry, index, path}}
    />
  );
}
