import {View} from 'react-native';
import {useNavigate} from 'react-exo/navigation';
import {useMemo, useState, useEffect, useRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileWindow} from 'media/hooks/useFileWindow';
import {MediaControls} from 'media/stacks/MediaControls';
import {getRenderInfo} from 'media/file/utils';
import File from 'media/file';

import type {FileRef} from 'media/file/types';

interface MediaProps {
  url: string,
  ext: string,
  name: string,
  path: string,
  vertical: boolean,
  maximized: boolean,
  close: () => void,
}

export function Media(props: MediaProps) {
  const nav = useNavigate();
  const file = useRef<FileRef>(null);
  const window = useFileWindow(props.ext);
  const {styles, theme} = useStyles(stylesheet);
  const {url, ext, name, path, vertical, maximized, close} = props;
  const isFullWidth = window.viewportWidth <= theme.breakpoints.xs;

  // File info
  const [title, setTitle] = useState(name);
  const [cover, setCover] = useState('');
  const renderer = useMemo(() => getRenderInfo(ext), [ext]);

  // Conditional styles
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      vertical && styles.vertical,
      maximized ? styles.maximized : styles.minimized,
      !maximized && {width: window.resolution[0], height: window.resolution[1]},
      isFullWidth && styles.fullwidth,
    ],
  }), [styles, window, vertical, maximized, isFullWidth]);

  // Change title when file name changes
  useEffect(() => {
    setTitle(name);
    setCover('');
  }, [name]);

  return (
    <View style={vstyles.root}>
      <View style={styles.contents}>
        <File
          ref={file}
          renderer={renderer}
          setBarIcon={setCover}
          setBarTitle={setTitle}
          {...props}
        />
      </View>
      <MediaControls {...{
        file,
        renderer,
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
        open: () => nav(url),
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
