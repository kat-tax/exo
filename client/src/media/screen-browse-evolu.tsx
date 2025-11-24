import {useDirEvolu} from 'media/dir/hooks/use-dir-evolu';
import {DirEvolu} from 'media/dir/stacks/dir-evolu';
import {Screen} from 'app/ui/screen';

export default function ScreenBrowseEvolu({route}: ReactNavigation.ScreenProps<'MediaBrowseEvolu'>) {
  const {pathId, deviceId} = route.params;
  const {dir, cmd, ext} = useDirEvolu(pathId || null, deviceId);

  const bar = {
    actions: [
      {
        id: 'create',
        icon: 'ph:plus',
        items: [
          {
            name: 'new-folder',
            label: 'New Folder',
            icon: 'ph:folder-plus',
            action: () => {
              console.log('new folder');
            },
          },
        ],
      },
    ],
  };

  return (
    <Screen>
      <DirEvolu {...{dir, cmd, ext, bar}}/>
    </Screen>
  );
}
