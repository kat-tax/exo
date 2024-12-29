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
  const selectionActive = selection?.queue?.length > 1;
  const selectionTarget = selectionActive ? selection?.queue?.[selection?.focus] : null;
  const targetPath = selectionTarget?.path ?? path;
  const targetName = selectionTarget?.name ?? name;
  const targetExt = selectionTarget?.ext ?? ext;

  // File information
  const [title, setTitle] = useState(targetName);
  const [cover, setCover] = useState('');
  const renderer = useMemo(() => getRenderInfo(targetExt), [targetExt]);

  // File visualization
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      vertical && styles.vertical,
      maximized ? styles.maximized : styles.minimized,
      !maximized && {width: rect.resolution[0], height: rect.resolution[1]},
      rect.viewportWidth <= theme.breakpoints.xs && styles.fullwidth,
    ],
  }), [styles, rect, vertical, maximized, theme.breakpoints.xs]);

  // Change title when file name changes
  useEffect(() => {
    setTitle(targetName);
    setCover('');
  }, [targetName]);

  return (
    <View style={vstyles.root}>
      {selection.queue.length > 1 &&
        <View style={styles.selection}>
          <MediaSelection {...selection}/>
        </View>
      }
      <ScrollView contentContainerStyle={styles.contents}>
        <File
          ref={file}
          path={targetPath}
          name={targetName}
          extension={targetExt}
          renderer={renderer}
          maximized={maximized}
          setBarIcon={setCover}
          setBarTitle={setTitle}
          close={close}
        />
      </ScrollView>
      <MediaControls {...{
        file,
        renderer,
        maximized,
        metadata: {
          url,
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
