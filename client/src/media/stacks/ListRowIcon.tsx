import {View} from 'react-native';
import {Icon} from 'react-exo/icon';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'app/hooks/useScheme';
import {getIcon} from 'media/file/icons';

interface ListRowIcon {
  path: string,
  name: string,
  extension: string,
  size?: 0 | 1,
  isFile?: boolean,
}

export function ListRowIcon(props: ListRowIcon) {
  const {styles, theme} = useStyles(stylesheet);
  const [scheme] = useScheme();
  const size = props.size === 0 ? 14 : 16;
  return (
    <View style={[styles.root, {width: size}]}>
      {props.isFile ? (
        <span
          className={getIcon(
            props.name,
            props.extension,
            '',
            scheme as 'light' | 'dark',
          )}
          style={{
            fontSize: size,
            color: theme.colors.foreground,
          }}
        />
      ) : (
        <Icon
          name="ph:folder-simple-fill"
          color={theme.colors.foreground}
          size={size * 1.15}
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
