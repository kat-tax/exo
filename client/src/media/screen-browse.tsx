import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Screen} from 'app/ui/screen';
import {useSet} from 'app/data';
import media from 'media/store';

export default function ScreenBrowse({route: _route}: ReactNavigation.ScreenProps<'MediaBrowse'>) {
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const {createFolder, importFolder, importFile, importCam} = useImportHfs();
  const set = useSet();

  const handleCreateFolder = async () => {
    const folderPath = path ? `${path}/New Folder` : 'New Folder';
    const newPath = await createFolder(folderPath);
    // Extract folder name from the full path
    const folderName = newPath.split('/').pop() || newPath;
    const fullPath = path ? `${path}/${folderName}` : folderName;
    // Focus the newly created folder
    set(media.actions.focus(fullPath));
    set(media.actions.selectItem({path: fullPath, isMulti: false, isRange: false}));
    // Trigger rename
    const entry = hfs.list.find(item => item.name === folderName);
    if (entry) {
      cmd.rename(entry);
    } else {
      console.log('>> fs [entry not found]', fullPath);
    }
  };

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
            action: handleCreateFolder,
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
