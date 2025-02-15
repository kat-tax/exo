import {View, Text, Pressable} from 'react-native';
import {Slider} from 'react-exo/slider';
import {Motion} from 'react-exo/motion';
import {Icon} from 'react-exo/icon';
import {useCallback, useMemo} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useMediaControls} from 'media/hooks/use-media-controls';
import {FileType} from 'media/file/types';
import {Thumb} from 'media/stacks/thumb';
import {isTouch} from 'app/utils/platform';

import type {FileProps} from 'media/file';
import type {FileRef, FileRenderInfo} from 'media/file/types';
import type {PressableStateCallbackType} from 'react-native';

const TOUCH = isTouch();

export interface MediaControlsProps {
  file: React.RefObject<FileRef>,
  renderer?: FileRenderInfo,
  maximized: boolean,
  actions: FileProps['actions'],
  metadata: {
    // General
    ext: string,
    path: string,
    name: string,
    // Display
    title: string,
    info?: string,
    cover?: string,
    // Audio/Video
    muted?: boolean,
    volume?: number,
    playing?: boolean,
    current?: number,
    duration?: number,
  },
}

export function MediaControls(props: MediaControlsProps) {
  const {controls, seekable} = useMediaControls(props);
  const {styles, theme} = useStyles(stylesheet);
  const [fileType] = props.renderer ?? [];
  const isBook = fileType === FileType.Book;
  const isDir = fileType === FileType.Directory;
  const vstyles = useMemo(() => ({
    icon: (state: PressableStateCallbackType) =>
      state.hovered || TOUCH
        ? theme.colors.foreground
        : theme.colors.mutedForeground,
    track: [
      styles.track,
      isBook && styles.disabled,
    ],
  }), [theme, styles, isBook]);

  const toc = useCallback(() => {
    console.log('>> table of contents not implemented');
  }, []);

  return (
    <Motion.View
      style={styles.root}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {seekable &&
        <View style={styles.track}>
          <Slider
            step={1}
            lowerLimit={0}
            disabled={isBook}
            value={props.metadata.current}
            upperLimit={props.metadata.duration}
            thumbColor={isBook ? 'transparent' : theme.colors.primary}
            rangeColor={isBook ? theme.colors.mutedForeground : theme.colors.primary}
            trackColor={theme.colors.secondary}
            trackHeight={isBook ? 1 : 2}
            onChange={e => {
              if (!props.file.current) return;
              if ('seek' in props.file.current) {
                props.file.current.seek(e);
              }
            }}
          />
        </View>
      }
      {controls.map(({name, icon, action}) => name === 'banner'
        ? <Pressable key={name} style={styles.content} onPress={toc}>
            <View style={styles.thumb}>
              <Thumb
                size={TOUCH ? 3 : 2}
                name={name ?? ''}
                ext={props.metadata.ext}
                img={() => Promise.resolve(props.metadata.cover ?? null)}
                dir={isDir}
              />
            </View>
            <Text style={styles.metadata} numberOfLines={2} selectable={false}>
              <View>
                <Text style={styles.title} numberOfLines={TOUCH ? 2 : 1}>
                  {props.metadata.title}
                </Text>
                <Text style={styles.info} numberOfLines={1}>
                  {props.metadata.info}
                </Text>
              </View>
            </Text>
          </Pressable>
        : <Pressable key={name} style={styles.action} onPress={action}>
            {state => (
              icon && <Icon
                name={icon}
                color={vstyles.icon(state)}
                size={TOUCH ? 20 : 18}
              />
            )}
          </Pressable>
      )}
    </Motion.View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.display.space1,
    backgroundColor: theme.colors.neutral,
    borderTopWidth: rt.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  track: {
    flex: 1,
    position: 'absolute',
    top: -20.5,
    left: -13,
    right: -10,
    zIndex: 99,
  },
  disabled: {
    pointerEvents: 'none',
  },
  action: {
    zIndex: 100,
    margin: theme.display.space1,
    paddingHorizontal: theme.display.space3,
    paddingVertical: TOUCH
      ? theme.display.space4
      : theme.display.space3,
  },
  content: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: theme.display.space1,
    paddingHorizontal: theme.display.space1,
  },
  thumb: {
    width: 32,
  },
  metadata: {
    marginTop: -2,
  },
  title: {
    fontSize: theme.font.size,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
  },
  info: {
    fontSize: theme.font.size,
    fontFamily: 'Fira Code, monospace',
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));
