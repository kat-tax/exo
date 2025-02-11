import {forwardRef, useEffect} from 'react';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/stacks/panel';

import type {FileProps} from 'media/file';

export interface FileDirectory extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileDirectory,
  _ref: React.Ref<unknown>,
) => {
  const {hfs, cmd, ext} = useDirHfs(path, true);

  useEffect(() => {
    if (!hfs) return;
    actions.setInfo(`${hfs.list?.length ?? 0} files`);
  }, [hfs, actions]);

  return (
    <Panel
      title={embedded ? name : undefined}
      message={embedded ? `${hfs?.list?.length} files` : undefined}
      margin="none"
      transparent
      noframe
      fluid>
      {hfs && <DirHfs {...{hfs, cmd, ext}}/>}
    </Panel>
  );
});
