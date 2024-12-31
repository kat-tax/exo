import {useMemo} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text, Pressable} from 'react-native';
import {Motion} from 'react-exo/motion';
import {Image} from 'react-exo/image';
import {Icon} from 'react-exo/icon';
import {isTouch} from 'app/utils/platform';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {useMediaControls} from 'media/hooks/useMediaControls';

import type {FileRef, FileRenderInfo} from 'media/file/types';
import type {PressableStateCallbackType} from 'react-native';

export interface MediaControlsProps {
  file: React.RefObject<FileRef>,
  renderer: FileRenderInfo,
  maximized: boolean,
  metadata: {
    ext: string,
    url: string,
    path: string,
    name: string,
    title: string,
    info?: string,
    cover?: string,
    muted?: boolean,
    volume?: number,
    playing?: boolean,
    duration?: number,
    current?: number,
  },
  close: () => void,
  open: () => void,
}

export function MediaControls(props: MediaControlsProps) {
  const {styles, theme} = useStyles(stylesheet);
  const controls = useMediaControls(props);
  const sizeGroup = isTouch() ? 1 : 0;
  const imageSize = sizeGroup === 1 ? 36 : 32;
  const iconSize = sizeGroup === 1 ? 20 : 16;
  const vstyles = useMemo(() => ({
    icon: (state: PressableStateCallbackType) =>
      state.hovered
        ? theme.colors.primary
        : theme.colors.foreground,
  }), [theme]);

  return (
    <Motion.View
      style={styles.root}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {controls.map(({name, icon, title, action}) => title
        ? <Pressable key={name} style={styles.content} onPress={action}>
            {props.metadata.cover
              ? <Image
                  url={props.metadata.cover}
                  resizeMode="contain"
                  height={imageSize}
                  width={imageSize}
              />
            : <ListRowIcon
                name={name ?? ''}
                extension={props.metadata.ext}
                path={props.metadata.path}
                isFile={true}
                size={2}
              />
            }
            <Text style={styles.metadata} numberOfLines={2} selectable={false}>
              <View>
                <Text style={styles.title} numberOfLines={2}>
                  {title}
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
                size={iconSize}
              />
            )}
          </Pressable>
      )}
    </Motion.View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.display.space1,
    backgroundColor: theme.colors.neutral,
    borderTopWidth: rt.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  action: {
    margin: theme.display.space1,
    paddingHorizontal: theme.display.space3,
    paddingVertical: isTouch()
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
    fontSize: 11,
    fontFamily: 'Fira Code, monospace',
    //fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));
