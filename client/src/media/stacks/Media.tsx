import {View, ScrollView} from 'react-native';
import {useNavigate} from 'react-exo/navigation';
import {useMemo, useState, useEffect, useRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileRect} from 'media/hooks/useFileRect';
import {useMediaSelection} from 'media/hooks/useMediaSelection';
import {MediaSelection} from 'media/stacks/MediaSelection';
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
  const rect = useFileRect(props.ext);
  const selection = useMediaSelection(props.path);
  const {styles, theme} = useStyles(stylesheet);
  const {url, ext, name, path, vertical, maximized, close} = props;
  
  // File selection
  const selectMultiple = selection?.queue?.length > 1;
  const selectActive = selection?.queue?.length > 0;
  const selectTarget = selectMultiple ? selection?.queue?.[selection?.focus] : null;
  const targetPath = selectTarget?.path ?? path;
  const targetName = selectTarget?.name ?? name;
  const targetExt = selectTarget?.ext ?? ext;
  const showSelection = maximized || selectActive;

  // File information
  const renderer = useMemo(() => getRenderInfo(targetExt), [targetExt]);
  const [cover, setCover] = useState('');
  const [title, setTitle] = useState(targetName);
  const [info, setInfo] = useState('');
  const isFullWidth = rect.viewportWidth <= theme.breakpoints.xs;

  // File visualization
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      vertical && styles.vertical,
      maximized ? styles.maximized : styles.minimized,
      !maximized && {width: rect.resolution[0]},
      isFullWidth && styles.fullwidth,
    ],
    frame: [
      !maximized && {width: rect.resolution[0], height: rect.resolution[1]},
      isFullWidth && styles.fullwidth,
    ],
  }), [styles, rect, vertical, maximized, isFullWidth]);

  // Change title when file name changes
  useEffect(() => {
    setTitle(targetName);
    setCover('');
    setInfo('~/');
  }, [targetName]);

  return (
    <View style={vstyles.root}>
      {showSelection &&
        <View style={styles.selection}>
          <MediaSelection {...{maximized, ...selection}} />
        </View>
      }
      <ScrollView style={vstyles.frame} contentContainerStyle={styles.contents}>
        <File
          ref={file}
          path={targetPath}
          name={targetName}
          extension={targetExt}
          renderer={renderer}
          maximized={maximized}
          setBarTitle={setTitle}
          setBarInfo={setInfo}
          setBarIcon={setCover}
          close={close}
        />
      </ScrollView>
      <MediaControls {...{
        file,
        renderer,
        maximized,
        metadata: {
          url,
          info,
          title,
          cover,
          path: targetPath,
          name: targetName,
          ext: targetExt,
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
