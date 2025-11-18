import {useDirEvolu} from 'media/dir/hooks/use-dir-evolu';
import {DirEvolu} from 'media/dir/stacks/dir-evolu';
import {Screen} from 'app/ui/screen';

export default function ScreenBrowseEvolu({route}: ReactNavigation.ScreenProps<'MediaBrowseEvolu'>) {
  const {pathId, deviceId} = route.params;
  const {dir, cmd, ext} = useDirEvolu(pathId || null, deviceId);

  const bar = {
    actions: [],
  };

  return (
    <Screen>
      <DirEvolu {...{dir, cmd, ext, bar}}/>
    </Screen>
  );
}
