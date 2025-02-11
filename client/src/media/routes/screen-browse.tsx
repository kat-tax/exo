import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'app/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/stacks/panel';

export default function ScreenBrowse() {
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const bar = {
    actions: [
      {icon: 'ph:plus', onPress: () => {}},
      {icon: 'ph:faders', onPress: () => {}},
      {icon: 'ph:squares-four', onPress: () => {}},
    ]
  };

  return (
    <Panel fullWidth margin="none">
      <DirHfs {...{hfs, cmd, ext, bar}}/>
    </Panel>
  );
}
