import {useState, useEffect} from 'react';
import {Touch} from 'app/ui/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuEvolu} from 'media/dir/stacks/menu-evolu';
import {useEntryEvolu} from 'media/dir/hooks/use-entry-evolu';

import type {DirEvoluCmd, DirEvoluOpt, DirEvoluEntry} from 'media/dir/types/evolu';

export interface EntryEvoluProps {
  index: number,
  item: DirEvoluEntry,
  cmd: DirEvoluCmd,
  opt: DirEvoluOpt,
}

export function EntryEvolu(props: EntryEvoluProps) {
  const {item} = props;
  const {name, size, isFile} = item;
  const {ext, cmd, opt, ref, foc} = useEntryEvolu(props);
  const [img, setImg] = useState<string | undefined>(undefined);

  const dir = !isFile;

  useEffect(() => {
    if (img) {
      URL.revokeObjectURL(img);
      setImg(undefined);
    }
    if (item.thumb) {
      const blob = new Blob([new Uint8Array(item.thumb)]);
      setImg(URL.createObjectURL(blob));
    }
    return () => {
      if (img) URL.revokeObjectURL(img);
    };
  }, [item.thumb]);

  return (
    <Touch
      refs={ref}
      onPress={(e) => {foc(); cmd.select(e)}}
      onDoublePress={dir ? () => cmd.open(true) : undefined}>
      <MenuEvolu {...{item, cmd}} on={() => foc()}>
        <ListRow
          {...{name, size, ext, dir, opt, img}}
        />
      </MenuEvolu>
    </Touch>
  );
}
