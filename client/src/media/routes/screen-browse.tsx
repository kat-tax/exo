import {StyleSheet, Display, mq} from 'react-native-unistyles';
import {View} from 'react-native';
import {useEffect} from 'react';
import {useParams} from 'react-exo/navigation';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'media/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/ui/panel';
import {breakpoints} from 'design/theme';

export default function ScreenBrowse() {
  const {path} = usePath();
  const {backend} = useParams<{backend: string}>();
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
    <View style={styles.root}>
      <Display mq={mq.only.width(breakpoints.sm)}>
        <View style={styles.rootAside}>
          <Panel>
            <DirHfs {...{hfs, cmd, ext, bar}}/>
          </Panel>
        </View>
      </Display>
      <Display mq={mq.only.width(0, breakpoints.sm - 1)}>
        <Panel>
          <DirHfs {...{hfs, cmd, ext, bar}}/>
        </Panel>
      </Display>
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
