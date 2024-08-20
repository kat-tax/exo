import {useNavigate} from 'react-exo/navigation';
import {useMemo, useState, useEffect, useRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View} from 'react-native';
import {CurrentFileBar} from 'media/stacks/CurrentFileBar';
import {getFileInfo} from 'media/utils/file';
import Player from 'media/file';

import type {FileRef} from 'media/file';

interface CurrentFileProps {
  url: string,
  ext: string,
  name: string,
  path: string,
  vertical: boolean,
  maximized: boolean,
  close: () => void,
}

export function CurrentFile(props: CurrentFileProps) {
  const navigate = useNavigate();
  const screen = useWindowDimensions();
  const player = useRef<FileRef>(null);
  const {styles, theme} = useStyles(stylesheet);
  const {url, ext, name, path, vertical, maximized, close} = props;
  const isFullWidth = screen.width <= theme.breakpoints.xs;

  // Derive file metadata
  const fileData = getFileInfo(ext);

  // Local state
  const [title, setTitle] = useState(name);
  const [cover, setCover] = useState('');

  // Picture-in-picture scale
  const scale = useMemo(() => {
    let _scale = 1;
    if (screen.width <= theme.breakpoints.sm)
      _scale = 0.85;
    else if (screen.width <= theme.breakpoints.md)
      _scale = 0.95;
    else if (screen.width <= theme.breakpoints.lg)
      _scale = 1;
    else if (screen.width <= theme.breakpoints.xl)
      _scale = 1.25;
    else if (screen.width <= theme.breakpoints.xxl)
      _scale = 1.5;
    else if (screen.width <= theme.breakpoints.xxxl)
      _scale = 2;
    else if (screen.width <= theme.breakpoints.xxxxl)
      _scale = 4;
    if (ext === 'pdf' && _scale > 1)
      _scale = 1;
    return _scale;
  }, [screen, theme, ext]);

  // Picture-in-picture resolution
  const resolution = useMemo(() => {
    const offset = 41;
    let res: number[];
    switch (ext) {
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
  }, [ext, scale]);

  // Conditional styles
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      vertical && styles.vertical,
      maximized ? styles.maximized : styles.minimized,
      !maximized && {width: resolution[0], height: resolution[1]},
      isFullWidth && styles.fullwidth,
    ],
  }), [styles, resolution, vertical, maximized, isFullWidth]);

  // Change title when file name changes
  useEffect(() => {
    setTitle(name);
    setCover('');
  }, [name]);

  return (
    <View style={vstyles.root}>
      <View style={styles.contents}>
        <Player
          ref={player}
          fileData={fileData}
          setBarIcon={setCover}
          setBarTitle={setTitle}
          {...props}
        />
      </View>
      <CurrentFileBar {...{
        player,
        fileData,
        maximized,
        metadata: {
          url,
          ext,
          name,
          title,
          cover,
          path,
          playing: true,
        },
        close,
        open: () => navigate(url),
      }}/>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 1,
  },
  vertical: {
    flex: 2,
    paddingHorizontal: {
      initial: 0,
      xs: theme.display.space2,
    }
  },
  maximized: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  minimized: {
    overflow: 'hidden',
    position: 'absolute',
    paddingTop: 0,
    paddingHorizontal: 0,
    bottom: theme.display.space5,
    right: theme.display.space5,
    borderRadius: theme.display.radius2,
    borderWidth: rt.hairlineWidth,
    borderColor: theme.colors.border,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 2px 1px',
  },
  fullwidth: {
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    boxShadow: 'none',
  },
  contents: {
    flex: 1,
    position: 'relative',
    transition: 'opacity 0.2s',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
