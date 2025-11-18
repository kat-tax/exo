import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Screen} from 'app/ui/screen';
import {useSet} from 'app/data';
import media from 'media/store';

export default function ScreenBrowse({route}: ReactNavigation.ScreenProps<'MediaBrowseLocal'>) {
  const {path} = route.params;
  const {hfs, cmd, ext} = useDirHfs(path || '');
  const add = useImportHfs();
  const set = useSet();

  const newFolder = async () => {
    const folderPath = path ? `${path}/New Folder` : 'New Folder';
    const newPath = await add.newFolder(folderPath);
    // Extract folder name from the full path
    const folderName = newPath.split('/').pop() || newPath;
    const fullPath = path ? `${path}/${folderName}` : folderName;
    // Focus, select, and trigger rename for the newly created folder
    set(media.actions.rename([fullPath]));
    set(media.actions.focus(fullPath));
    set(media.actions.selectItem({
      path: fullPath,
      isMulti: false,
      isRange: false,
    }));
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
            action: newFolder,
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
                action: () => add.importFolder(path),
              },
              {
                name: 'import-files',
                label: 'Files',
                icon: 'ph:file',
                action: () => add.importFile(path),
              },
              {
                name: 'import-camera',
                label: 'Cam',
                icon: 'ph:camera',
                action: () => add.importCam(path),
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
