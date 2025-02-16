import {List} from 'media/stacks/list';
import {EntryZip} from 'media/dir/stacks/entry-zip';
import type {ZipCtx, ZipOpt} from 'media/dir/types/zip';

export function DirZip({zip, cmd}: ZipCtx) {
  return (
    <List
      items={zip?.list}
      opts={{layout: 'grid', preview: true}}
      render={({item}) => {
        const opt: Partial<ZipOpt> = {
          layout: 'grid',
          preview: true,
        };
        return <EntryZip {...{item, cmd, opt}}/>;
      }}
    />
  );
}
