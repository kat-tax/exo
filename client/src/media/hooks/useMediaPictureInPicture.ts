import {useMemo} from 'react';
import {useStyles} from 'react-native-unistyles';
import {useWindowDimensions} from 'react-native';

export type MediaPictureInPicture = {
  scale: number,
  resolution: number[],
  viewportWidth: number,
};

export function useMediaPictureInPicture(extension: string): MediaPictureInPicture {
  const {width} = useWindowDimensions();
  const {theme} = useStyles();

  /** Scale of the PIP window */
  const scale = useMemo(() => {
    let _scale = 1;
    if (width <= theme.breakpoints.sm)
      _scale = 0.90;
    else if (width <= theme.breakpoints.md)
      _scale = 1;
    else if (width <= theme.breakpoints.lg)
      _scale = 1.25;
    else if (width <= theme.breakpoints.xl)
      _scale = 1.50;
    else if (width <= theme.breakpoints.xxl)
      _scale = 1.75;
    else if (width <= theme.breakpoints.xxxl)
      _scale = 3;
    else if (width <= theme.breakpoints.xxxxl)
      _scale = 4;
    return _scale;
  }, [width, theme]);

  /** Resolution of the PIP window */
  const resolution = useMemo(() => {
    let res: number[];
    switch (extension) {
      case 'gb':
      case 'gbc':
      case 'gba':
        res = [160 * 2, (144 * 2)].map(x => x * scale);
        break;
      case 'pdf':
        res = [414, 252].map(x => x * scale);
        break;
      case 'riv':
        res = [320, 222].map(x => x * scale);
        break;
      case 'mp4':
      case 'mov':
        res = [320, 180].map(x => x * scale);
        break;
      default:
        res = [320, 240].map(x => x * scale);
    }
    return res;
  }, [extension, scale]);

  return {
    scale,
    resolution,
    viewportWidth: width,
  };
}
