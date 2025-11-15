import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Screen} from 'app/ui/screen';

export default function ScreenGames({route: _route}: ReactNavigation.ScreenProps<'MediaGames'>) {
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const add = useImportHfs();

  const bar = {
    actions: [
      {
        id: 'new',
        icon: 'ph:plus',
        items: [
          {
            name: 'import-folder',
            label: 'Folder',
            icon: 'ph:folder',
            action: () => add.importFolder(path),
          },
          {
            name: 'import-files',
            label: 'Files',
            icon: 'ph:file',
            action: () => add.importFile(path),
          },
        ],
      },
    ],
  };

  return (
    <Screen>
      <DirHfs {...{hfs, cmd, ext, bar}}/>
    </Screen>
  );
}
