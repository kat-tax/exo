import {useMemo} from 'react';
import {useStyles} from 'react-native-unistyles';
import {useWindowDimensions} from 'react-native';

export type FileWindow = {
  scale: number,
  resolution: number[],
  viewportWidth: number,
};

export function useFileWindow(extension: string): FileWindow {
  const {width} = useWindowDimensions();
  const {theme} = useStyles();

  /** Scale of the PIP window */
  const scale = useMemo(() => {
    let _scale = 1;
    if (width <= theme.breakpoints.sm)
      _scale = 0.85;
    else if (width <= theme.breakpoints.md)
      _scale = 0.95;
    else if (width <= theme.breakpoints.lg)
      _scale = 1;
    else if (width <= theme.breakpoints.xl)
      _scale = 1.25;
    else if (width <= theme.breakpoints.xxl)
      _scale = 1.5;
    else if (width <= theme.breakpoints.xxxl)
      _scale = 2;
    else if (width <= theme.breakpoints.xxxxl)
      _scale = 4;
    if (extension === 'pdf' && _scale > 1)
      _scale = 1;
    return _scale;
  }, [width, theme, extension]);

  /** Resolution of the PIP window */
  const resolution = useMemo(() => {
    const offset = 41;
    let res: number[];
    switch (extension) {
      case 'gb':
      case 'gbc':
      case 'gba':
        res = [160 * 2, (144 * 2)].map(x => x * scale);
        res[1] += offset;
        break;
      case 'pdf':
        res = [414, 252].map(x => x * scale);
        res[1] += offset;
        break;
      case 'riv':
        res = [320, 222].map(x => x * scale);
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
