import {useEffect} from 'react';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Screen} from 'app/ui/screen';

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
    <Screen>
      <DirHfs {...{hfs, cmd, ext, bar}}/>
    </Screen>
  );
}
