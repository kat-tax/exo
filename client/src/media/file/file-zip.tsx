import {forwardRef, useEffect} from 'react';
import {useDirZip} from 'media/dir/hooks/use-dir-zip';
import {DirZip} from 'media/dir/stacks/dir-zip';
import {Panel} from 'app/stacks/panel';
import {bytesize} from 'app/utils/formatting';

import type {FileProps} from 'media/file';

export interface FileZip extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileZip,
  _ref,
) => {
  const {zip, cmd} = useDirZip(path);

  useEffect(() => {
    if (!zip) return;
    const files = zip.list?.length ?? 0;
    const size = bytesize(zip.size?.compressed ?? 0);
    const msg = `${files} files, ${size}`;
    actions.setInfo(msg);
  }, [zip, actions]);

  return (
    <Panel
      title={embedded ? name : undefined}
      message={embedded ? `${zip?.list?.length} files` : undefined}
      margin={embedded ? 'small' : 'none'}
      transparent
      noframe
      fluid>
      {zip && <DirZip {...{zip, cmd}}/>}
    </Panel>
  )
});
