import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Media} from 'media/stacks/Media';
import {toPathInfo} from 'app/utils/formatting';

import type {MessageProps} from './Message';

interface MessageEmbedProps {
  path: string;
  origin: MessageProps['origin'];
}

export function MessageEmbed(props: MessageEmbedProps) {
  const {path, origin} = props;
  const {styles} = useStyles(stylesheet);
  const {name, ext} = toPathInfo(path, false);
  return (
    <View style={[
      styles.root,
      origin === 'Remote' ? styles.rootRemote : styles.rootLocal,
    ]}>
      <Media
        {...{name, ext, path}}
        close={() => null}
        vertical={false}
        embedded
        maximized
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral,
    borderRadius: 12,
    overflow: 'hidden',
  },
  rootRemote: {
    borderBottomLeftRadius: 0,
  },
  rootLocal: {
    borderBottomRightRadius: 0,
  },
}));
