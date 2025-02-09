import {useCurrentPath} from 'app/hooks/use-current-path';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/stacks/panel';

export default function ScreenBrowse() {
  const {path} = useCurrentPath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const bar = {hidden: false};

  return (
    <Panel fullWidth margin="none">
      <DirHfs {...{hfs, cmd, ext, bar}}/>
    </Panel>
  );
}
