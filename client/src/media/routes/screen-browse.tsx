import {StyleSheet, useUnistyles} from 'react-native-unistyles';
import {useWindowDimensions, View} from 'react-native';
import {useEffect} from 'react';
import {useParams} from 'react-exo/navigation';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/ui/panel';

export default function ScreenBrowse() {
  const screen = useWindowDimensions();
  const {path} = usePath();
  const {backend} = useParams<{backend: string}>();
  const {hfs, cmd, ext} = useDirHfs(path);
  const {theme} = useUnistyles();
  const isVertical = screen.width < theme.breakpoints.sm;

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
    <View style={[styles.root, !isVertical && styles.rootAside]}>
      <Panel fluid margin="none">
        <DirHfs {...{hfs, cmd, ext, bar}}/>
      </Panel>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  root: {
    flex: 1,
  },
  rootAside: {
    maxWidth: 254,
  },
}));
