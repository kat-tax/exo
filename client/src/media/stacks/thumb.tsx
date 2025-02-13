import {View} from 'react-native';
import {Icon} from 'react-exo/icon';
import {Image} from 'react-exo/image';
import {useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useTheme} from 'app/hooks/use-theme';
import {getIcon} from 'media/file/icons';

interface ThumbProps {
  size?: ThumbSize,
  name?: string,
  dir?: boolean,
  img?: () => Promise<string | null>,
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
  img = undefined,
}: ThumbProps) {
  const height = getHeight(size);
  const [scheme] = useTheme();
  const {styles, theme} = useStyles(stylesheet);
  const [icon, setIcon] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Set icon based when name and extension change
  useEffect(() => {
    getIcon(name, ext, '', scheme).then(setIcon);
  }, [name, ext, scheme]);

  // Set image when img function changes
  useEffect(() => {
    if (!img) return;
    img().then(setImage);
  }, [img]);

  // Revoke image when component unmounts
  useEffect(() => () => {
    if (image) URL.revokeObjectURL(image);
  }, [image]);

  return (
    <View style={[styles.root, {height}]}>
      {(img && image
        ? <Image
            url={image}
            style={{height, width: '100%'}}
            resizeMode="contain"
          />
        : dir
          ? <Icon
              name="ph:folder-simple-fill"
              color={theme.colors.foreground}
              size={height}
            />
          : <span
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
