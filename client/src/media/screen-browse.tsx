import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Screen} from 'app/ui/screen';

export default function ScreenBrowse({route}: ReactNavigation.ScreenProps<'MediaBrowse'>) {
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const {createFolder, importFolder, importFile, importCam} = useImportHfs();

  const bar = {
    actions: [
      {
        id: 'new',
        icon: 'ph:plus',
        items: [
          {
            name: 'new-folder',
            label: 'New Folder',
            icon: 'ph:folder-plus',
            action: () => createFolder(`${path}/New Folder`),
          },
          {
            name: 'divider',
            label: '-',
          },
          {
            name: 'import',
            label: 'Import…',
            icon: 'ph:upload',
            sub: [
              {
                name: 'import-folder',
                label: 'Folder',
                icon: 'ph:folder',
                action: () => importFolder(path),
              },
              {
                name: 'import-files',
                label: 'Files',
                icon: 'ph:file',
                action: () => importFile(path),
              },
              {
                name: 'import-camera',
                label: 'Cam',
                icon: 'ph:camera',
                action: () => importCam(path),
              },
            ],
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
