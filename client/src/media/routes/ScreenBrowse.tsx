import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {useHfs} from 'media/dir/hfs/hooks/useHfs';
import {HfsDir} from 'media/dir/hfs';
import {Panel} from 'app/stacks/panel';

export default function ScreenBrowse() {
  const {path} = useLocationPathInfo();
  const {hfs, cmd, ext} = useHfs(path);
  const bar = {hidden: false};

  return (
    <Panel fullWidth margin="none">
      <HfsDir {...{hfs, cmd, ext, bar}}/>
    </Panel>
  );
}
