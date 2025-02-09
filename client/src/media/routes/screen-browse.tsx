import {useCurrentPath} from 'app/hooks/use-current-path';
import {useHfs} from 'media/dir/hfs/hooks/use-hfs';
import {HfsDir} from 'media/dir/hfs';
import {Panel} from 'app/stacks/panel';

export default function ScreenBrowse() {
  const {path} = useCurrentPath();
  const {hfs, cmd, ext} = useHfs(path);
  const bar = {hidden: false};

  return (
    <Panel fullWidth margin="none">
      <HfsDir {...{hfs, cmd, ext, bar}}/>
    </Panel>
  );
}
