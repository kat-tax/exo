import {useMemo} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Motion} from 'react-exo/motion';
import {Image} from 'react-exo/image';
import {Icon} from 'react-exo/icon';
import {useFileControls} from 'media/hooks/useFileControls';

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
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      false && styles.floating,
    ],
    icon: (state: PressableStateCallbackType) =>
      state.hovered
        ? theme.colors.foreground
        : theme.colors.mutedForeground,
  }), [theme, styles]);

  return (
    <Motion.View
      style={vstyles.root}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {controls.map(({name, icon, title, action}) => title
        ? <Pressable key={name} style={styles.title} onPress={action}>
            {!!props.metadata.cover &&
              <Image
                url={props.metadata.cover}
                style={styles.cover}
                resizeMode="contain"
                height={20}
                width={20}
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
                size={16}
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
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    padding: theme.display.space3,
  },
  cover: {
    marginRight: theme.display.space1,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.display.space1,
  },
  titleText: {
    fontSize: {
      initial: 10,
      lg: 11,
      xl: 12,
    },
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));
