import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Media} from 'media/stacks/Media';
import {toPathInfo} from 'app/utils/formatting';

import type {MessageProps} from './Message';

interface MessageEmbedProps {
  path: string;
  name?: string;
  origin?: MessageProps['origin'];
  layout?: [number, number];
}

export function MessageEmbed(props: MessageEmbedProps) {
  const {path, origin, layout} = props;
  const {name, ext} = toPathInfo(props.name ?? path, false);
  const {styles} = useStyles(stylesheet);
  return (
    <View style={[styles.root, origin === 'Remote' ? styles.remote : styles.local]}>
      <Media
        {...{name, ext, path, layout}}
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
  remote: {
    borderBottomLeftRadius: 0,
  },
  local: {
    borderBottomRightRadius: 0,
  },
}));
