import {useMemo} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Motion} from 'react-exo/motion';
import {Image} from 'react-exo/image';
import {Icon} from 'react-exo/icon';
import {isTouch} from 'app/utils/platform';
import {FileType} from 'media/utils/file';
import {useFileControls} from 'media/hooks/useFileControls';
import {ListRowIcon} from 'media/stacks/ListRowIcon';

import type {FileRef} from 'media/file';
import type {FileData} from 'media/utils/file';
import type {PressableStateCallbackType} from 'react-native';

export interface CurrentFileBarProps {
  player: React.RefObject<FileRef>,
  fileData: FileData,
  maximized: boolean,
  metadata: {
    ext: string,
    url: string,
    path: string,
    name: string,
    title: string,
    cover?: string,
    playing?: boolean,
    duration?: number,
    current?: number,
  },
  close: () => void,
  open: () => void,
}

export function CurrentFileBar(props: CurrentFileBarProps) {
  const {styles, theme} = useStyles(stylesheet);
  const controls = useFileControls(props);
  const sizeState = isTouch() ? 1 : 0;
  const imageSize = sizeState === 1 ? 28 : 24;
  const iconSize = sizeState === 1 ? 20 : 16;
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      false && styles.floating,
    ],
    icon: (state: PressableStateCallbackType) =>
      isTouch() || state.hovered
        ? theme.colors.foreground
        : theme.colors.mutedForeground,
  }), [theme, styles]);

  if (props.maximized
    && props.fileData[0] === FileType.Torrent) {
    return null;
  }

  return (
    <Motion.View
      style={vstyles.root}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {controls.map(({name, icon, title, action}) => title
        ? <Pressable key={name} style={styles.title} onPress={action}>
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
                  size={sizeState}
                  isFile={true}
                />
            }
            <Text style={styles.titleText} numberOfLines={2}>
              {title}
            </Text>
          </Pressable>
        : <Pressable key={name} style={styles.icon} onPress={action}>
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
    borderTopWidth: 0,//rt.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    padding: theme.display.space3,
  },
  title: {
    flex: 1,
    gap: theme.display.space2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.display.space1,
  },
  titleText: {
    fontSize: isTouch()
      ? theme.font.contentSize
      : theme.font.size,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));
