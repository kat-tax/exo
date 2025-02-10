import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'app/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/stacks/panel';

export default function ScreenBrowse() {
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  return (
    <Panel fullWidth margin="none">
      <DirHfs {...{hfs, cmd, ext, bar: {hidden: false}}}/>
    </Panel>
  );
}
