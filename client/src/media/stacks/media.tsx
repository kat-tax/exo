import {View, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {breakpoints} from 'design/theme';
import {useLingui} from '@lingui/react/macro';
import {useMemo, useState, useEffect, useRef, startTransition} from 'react';
import {useMediaPictInPict} from 'media/hooks/use-media-pip';
import {MediaControls} from 'media/stacks/controls';
import {getRenderer} from 'media/file/utils/render';
import {findPathInfo} from 'media/file/utils/data';
import File from 'media/file';

import type {FileRef, FileRenderInfo} from 'media/file/types';

const PLACEHOLDER = '‎';

interface MediaProps {
  path: string,
  embedded: boolean,
  maximized: boolean,
  vertical: boolean,
  layout?: [number, number],
  close: () => void,
}

export function Media({path, vertical, maximized, embedded, layout, close}: MediaProps) {
  const [pathInfo, setPathInfo] = useState<Awaited<ReturnType<typeof findPathInfo>> | null>(null);
  const [renderer, setRenderer] = useState<FileRenderInfo>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(PLACEHOLDER);
  const [info, setInfo] = useState(PLACEHOLDER);
  const [cover, setCover] = useState('');
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const {t} = useLingui();
  const pip = useMediaPictInPict(pathInfo?.ext, layout);
  const file = useRef<FileRef>(null);

  const isDir = pathInfo?.isDir ?? false;
  const name = pathInfo?.name || t`Files`;
  const ext = pathInfo?.ext ?? '';

  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      vertical && styles.vertical,
      maximized ? styles.maximized : styles.minimized,
      !maximized && {width: pip.resolution[0]},
      pip.viewportWidth <= breakpoints.xs && styles.fullwidth,
      embedded && {
        width: pip.resolution[0],
        height: pip.resolution[1],
        minWidth: pip.resolution[0],
        minHeight: pip.resolution[1],
      },
    ],
    frame: [
      !maximized && {width: pip.resolution[0], height: pip.resolution[1]},
      pip.viewportWidth <= breakpoints.xs && styles.fullwidth,
    ],
  }), [styles, pip, vertical, maximized, embedded]);

  const actions = useMemo(() => ({
    open: () => {},
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

  // Update path info when path changes
  useEffect(() => {
    setLoading(true);
    setInfo(PLACEHOLDER);
    setTitle(PLACEHOLDER);
    setCover('');
    setMuted(false);
    setVolume(100);
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    startTransition(() => {
      (async () => {
        const _pathInfo = await findPathInfo(path);
        const dirType = _pathInfo.isDir ? _pathInfo.protocol : undefined;
        setRenderer(getRenderer(_pathInfo.ext, dirType));
        setPathInfo(_pathInfo);
        setTitle(_pathInfo.name || t`Files`);
        setLoading(false);
      })();
    });
  }, [path]);

  return (
    <View style={vstyles.root}>
      {loading ? null : <>
        <ScrollView style={vstyles.frame} contentContainerStyle={styles.contents}>
          <File
            ref={file}
            path={path}
            name={name}
            extension={ext}
            renderer={renderer}
            embedded={embedded}
            maximized={maximized}
            actions={actions}
          />
        </ScrollView>
        {!embedded &&
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
              isDir,
              loading,
              muted,
              volume,
              playing,
              current,
              duration,
            },
          }}/>
        }
      </>}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 2,
  },
  vertical: {
    flex: 2,
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
    borderWidth: StyleSheet.hairlineWidth,
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
