// import {useDispatch, useSelector} from 'react-redux';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View} from 'react-native';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {usePath} from 'app/hooks/use-path';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
// import media from 'media/store';
import {Panel} from 'app/stacks/panel';

export default function ScreenBrowse() {
  const screen = useWindowDimensions();
  const {path} = usePath();
  const {hfs, cmd, ext} = useDirHfs(path);
  const {theme, styles} = useStyles(stylesheet);
  const isVertical = screen.width < theme.breakpoints.sm;

  // const layout = useSelector(media.selectors.getLayout);
  // const dispatch = useDispatch();

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
      //   onPress: () => dispatch(media.actions.layout(layout === 'grid' ? 'list' : 'grid')),
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
