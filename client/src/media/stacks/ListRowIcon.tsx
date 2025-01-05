import {Icon} from 'react-exo/icon';
import {View} from 'react-native';

import {useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'app/hooks/useScheme';
import {getIcon} from 'media/file/icons';

interface ListRowIcon {
  name: string,
  extension: string,
  isFile?: boolean,
  size?: 0 | 1 | 2,
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
    getIcon(props.name, props.extension, '', iconScheme).then(setIcon);
  }, [props.name, props.extension, iconScheme]);

  return (
    <View style={[styles.root, {width: iconSize}]}>
      {props.isFile ? (
        <span
          className={icon ?? ''}
          style={{
            fontSize: iconSize,
            color: theme.colors.foreground,
          }}
        />
      ) : (
        <Icon
          name="ph:folder-simple-fill"
          color={theme.colors.foreground}
          size={iconSize * 1.15}
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
