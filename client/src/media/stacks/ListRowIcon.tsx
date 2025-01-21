import {Icon} from 'react-exo/icon';
import {View} from 'react-native';

import {useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'app/hooks/useScheme';
import {getIcon} from 'media/file/icons';

interface ListRowIcon {
  name: string,
  size?: 0 | 1 | 2,
  dir?: boolean,
  ext?: string,
}

export function ListRowIcon(props: ListRowIcon) {
  const [icon, setIcon] = useState<string | null>(null);
  const {styles, theme} = useStyles(stylesheet);
  const [scheme] = useScheme();

  const iconScheme = scheme === 'light' ? 'light' : 'dark';
  const iconSize = props.size === 0
    ? 14
    : props.size === 2
      ? 24
      : 16;

  useEffect(() => {
    getIcon(props.name, props.ext ?? '', '', iconScheme)
      .then(setIcon);
  }, [props.name, props.ext, iconScheme]);

  return (
    <View style={[styles.root, {width: iconSize}]}>
      {props.dir ? (
        <Icon
          name="ph:folder-simple-fill"
          color={theme.colors.foreground}
          size={iconSize * 1.15}
        />
      ) : (
        <span
          className={icon ?? ''}
          style={{
            fontSize: iconSize,
            color: theme.colors.foreground,
          }}
        />
      )}
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
