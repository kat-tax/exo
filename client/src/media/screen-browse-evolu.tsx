import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useDirEvolu} from 'media/dir/hooks/use-dir-evolu';
import {DirEvolu} from 'media/dir/stacks/dir-evolu';
import {Screen} from 'app/ui/screen';

export default function ScreenBrowseEvolu({route}: ReactNavigation.ScreenProps<'MediaBrowseEvolu'>) {
  const {pathId, deviceId} = route.params;
  const {dir, cmd, ext} = useDirEvolu(pathId || null, deviceId);
  const {ref, focusKey} = useFocusable({
    preferredChildFocusKey: 'list-0',
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
  });

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
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        <Screen>
          <DirEvolu {...{dir, cmd, ext, bar}}/>
        </Screen>
      </View>
    </FocusContext.Provider>
  );
}

const styles = StyleSheet.create(() => ({
  root: {
    flex: 1,
  },
}));
