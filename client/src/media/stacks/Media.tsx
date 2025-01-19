import {View, ScrollView} from 'react-native';
import {useMemo, useState, useEffect, useRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useMediaPictureInPicture} from 'media/hooks/useMediaPictureInPicture';
import {MediaSelection} from 'media/stacks/MediaSelection';
import {MediaControls} from 'media/stacks/MediaControls';
import {getRenderer} from 'media/file/utils/render';
import File from 'media/file';

import type {FileRef, FileRenderInfo} from 'media/file/types';

interface MediaProps {
  ext: string,
  name: string,
  path: string,
  vertical: boolean,
  maximized: boolean,
  close: () => void,
}

export function Media(props: MediaProps) {
  const pip = useMediaPictureInPicture(props.ext);

  const file = useRef<FileRef>(null);
  const {styles, theme} = useStyles(stylesheet);
  const {ext, name, path, vertical, maximized, close} = props;

  // File information
  const [renderer, setRenderer] = useState<FileRenderInfo>();
  const [title, setTitle] = useState(`${name}.${ext}`);
  const [info, setInfo] = useState('‎');
  const [cover, setCover] = useState('');
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // File visualization
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      vertical && styles.vertical,
      maximized ? styles.maximized : styles.minimized,
      !maximized && {width: pip.resolution[0]},
      pip.viewportWidth <= theme.breakpoints.xs && styles.fullwidth,
    ],
    frame: [
      !maximized && {width: pip.resolution[0], height: pip.resolution[1]},
      pip.viewportWidth <= theme.breakpoints.xs && styles.fullwidth,
    ],
  }), [styles, pip, vertical, maximized, theme.breakpoints]);

  // File actions
  const actions = useMemo(() => ({
    open: () => console.log('open'),
    close,
    setInfo,
    setCover,
    setTitle,
    setMuted,
    setVolume,
    setPlaying,
    setCurrent,
    setDuration,
  }), [close]);

  // Reset information when file changes
  useEffect(() => {
    setTitle(`${name}.${ext}`);
    setCover('');
    setInfo('‎');
    setMuted(false);
    setVolume(100);
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
  }, [name, ext]);

  // Update renderer when file extension changes
  useEffect(() => {
    (async () => {
      setRenderer(await getRenderer(ext, path));
    })();
  }, [ext, path]);

  return (
    <View style={vstyles.root}>
      <MediaSelection/>
      <ScrollView style={vstyles.frame} contentContainerStyle={styles.contents}>
        <File
          ref={file}
          path={path}
          name={name}
          extension={ext}
          renderer={renderer}
          maximized={maximized}
          actions={actions}
        />
      </ScrollView>
      <MediaControls {...{
        file,
        renderer,
        maximized,
        actions,
        metadata: {
          info,
          title,
          cover,
          path,
          name,
          ext,
          muted,
          volume,
          playing,
          current,
          duration,
        },
      }}/>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 2,
    backgroundColor: theme.colors.neutral,
  },
  vertical: {
    flex: 3,
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
  selection: {
    flexGrow: 0,
  },
  contents: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
