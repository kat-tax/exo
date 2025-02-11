import {List} from 'media/stacks/list';
import {EntryZip} from 'media/dir/stacks/entry-zip';
import type {ZipCtx} from 'media/dir/types/zip';

export function DirZip({zip, cmd}: ZipCtx) {
  return (
    <List
      list={zip?.list}
      render={({item}) => <EntryZip {...{item, cmd, opt: {}}}/>}
    />
  );
}
