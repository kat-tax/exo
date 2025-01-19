import {useHfsDir} from '../hooks/useHfsDir';
import {HfsEntry} from './HfsEntry';

export interface HfsDirProps {
  path: string,
}

export function HfsDir(props: HfsDirProps) {
  const {entries, selection} = useHfsDir(props.path);
  const basePath = props.path;
  return entries.map((entry, index) => {
    const fullPath = basePath ? `${basePath}/${entry.name}` : entry.name;
    const isSelected = selection?.includes(fullPath);
    return (
      <HfsEntry
        key={entry.isDirectory ? `.${entry.name}` : entry.name}
        {...{entry, index, basePath, isSelected}}
      />
    );
  });
}
