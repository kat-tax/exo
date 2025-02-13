import {Icon} from 'react-exo/icon';
import {View} from 'react-native';
import {useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useTheme} from 'app/hooks/use-theme';
import {getIcon} from 'media/file/icons';

interface ThumbProps {
  size?: ThumbSize,
  name?: string,
  dir?: boolean,
  ext?: string,
}

export enum ThumbSize {
  XS = 0,
  SM = 1,
  MD = 2,
  LG = 3,
  XL = 4,
  XXL = 5,
  XXXL = 6,
}

export const getHeight = (size: ThumbSize) => {
  switch (size) {
    case 6:
      return 90;
    case 5:
      return 72;
    case 4:
      return 64;
    case 3:
      return 48;
    case 2:
      return 32;
    case 1:
      return 24;
    default:
      return 16;
  }
};

export function Thumb({
  size = ThumbSize.MD,
  name = '',
  ext = '',
  dir = false,
}: ThumbProps) {
  const height = getHeight(size);
  const [scheme] = useTheme();
  const {styles, theme} = useStyles(stylesheet);
  const [icon, setIcon] = useState<string | null>(null);

  useEffect(() => {
    getIcon(name, ext, '', scheme).then(setIcon);
  }, [name, ext, scheme]);

  return (
    <View style={[styles.root, {height}]}>
      {dir ? (
        <Icon
          name="ph:folder-simple-fill"
          color={theme.colors.foreground}
          size={height}
        />
      ) : (
        <span
          className={icon ?? ''}
          style={{fontSize: height / 1.3, color: theme.colors.foreground}}
        />
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.display.radius1,
  },
}));
