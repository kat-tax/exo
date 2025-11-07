import {useEffect} from 'react';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/ui/panel';

export default function ScreenBrowse({route}: ReactNavigation.ScreenProps<'MediaBrowse'>) {
  const {path} = usePath();
  const {backend} = route.params;
  const {hfs, cmd, ext} = useDirHfs(path);

  const bar = {
    actions: [
      {
        id: 'new',
        icon: 'ph:plus',
        onPress: () => {},
      },
    ],
  };

  useEffect(() => {
    if (backend) {
      console.log('>> backend', backend);
    }
  }, [backend]);

  return (
    <Panel>
      <DirHfs {...{hfs, cmd, ext, bar}}/>
    </Panel>
  );
}
