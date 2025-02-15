import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View} from 'react-native';
// import {usePut, useGet} from 'app/data/store';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'app/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/stacks/panel';
// import media from 'media/store';

export default function ScreenBrowse() {
  const screen = useWindowDimensions();
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const {theme, styles} = useStyles(stylesheet);
  const isVertical = screen.width < theme.breakpoints.sm;

  // const layout = useGet(media.selectors.getLayout);
  // const put = usePut();

  const bar = {
    actions: [
      {
        id: 'new',
        icon: 'ph:plus',
        onPress: () => {},
      },
      // {
      //   id: 'options',
      //   icon: 'ph:faders',
      //   onPress: () => {},
      // },
      // {
      //   id: 'layout',
      //   icon: layout === 'grid' ? 'ph:square-split-vertical' : 'ph:squares-four',
      //   onPress: () => put(media.actions.layout(layout === 'grid' ? 'list' : 'grid')),
      // },
    ],
  };

  return (
    <View style={[styles.root, !isVertical && styles.rootAside]}>
      <Panel fluid margin="none">
        <DirHfs {...{hfs, cmd, ext, bar}}/>
      </Panel>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
  rootAside: {
    maxWidth: 254,
  },
}));
