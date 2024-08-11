import {Icon} from 'react-exo/icon';
import {useNavigate} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, Pressable} from 'react-native';
import {useMemo, useState} from 'react';
import {resolve} from 'media/utils/path';
import {File} from 'media/stacks/File';

interface CurrentFileProps {
  path: string,
  vertical: boolean,
  maximized: boolean,
  close: () => void,
}

export function CurrentFile(props: CurrentFileProps) {
  const {vertical, maximized, close} = props;
  const [pointer, setPointer] = useState(false);
  const [pinned, setPinned] = useState(false);
  const {styles, theme} = useStyles(stylesheet);
  const navigate = useNavigate();
  const screen = useWindowDimensions();
  const parts = resolve(props.path);
  const [name, extension] = parts.slice(-1)[0].split('.') ?? [];
  const fileUrl = `/browse/${parts.slice(0, -1).join('/')}#${name}.${extension}`;

  const scale = useMemo(() => {
    let _scale = 1;
    if (!pinned && screen.width <= theme.breakpoints.xs)
      _scale = 0.35;
    else if (!pinned && screen.width <= theme.breakpoints.sm)
      _scale = 0.50;
    else if (!pinned && screen.width <= theme.breakpoints.md)
      _scale = 0.75;
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
    return _scale;
  }, [screen, theme, pinned]);

  const resolution = useMemo(() => {
    switch (extension) {
      case 'gb':
      case 'gbc':
      case 'gba':
        return [160 * 2, 144 * 2].map(x => x * scale);
      case 'pdf':
        return [414, 252].map(x => x * scale);
      default:
        return [320, 240].map(x => x * scale);
    }
  }, [extension, scale]);

  return (
    <Pressable
      style={[
        styles.root,
        vertical && styles.vertical,
        maximized ? styles.maximized : styles.minimized,
        !maximized && {width: resolution[0], height: resolution[1]},
      ]}
      onPointerEnter={() => setPointer(true)}
      onPointerLeave={() => setPointer(false)}
      onPress={() => navigate(fileUrl)}>
      {root => <>
        <View style={[
          styles.contents,
          !maximized && styles.contentsMinimized,
          !maximized && pinned && styles.contentsPinned,
          root.hovered && styles.contentsHovered,
        ]}>
          <File {...props}/>
        </View>
        {!maximized && pointer && <>
          <Pressable
            style={styles.close}
            onPress={close}>
            {close => (
              <Icon
                name="ph:x"
                size={20}
                color={
                  root.hovered
                    ? theme.colors.accent
                    : pinned
                      ? theme.colors.accent
                      : close.hovered
                        ? theme.colors.foreground
                        : theme.colors.mutedForeground
                }
              />
            )}
          </Pressable>
          <Pressable
            style={styles.pin}
            onPress={() => setPinned(!pinned)}>
            {pin => (
              <Icon
                name={pinned ? 'ph:push-pin-simple' : 'ph:push-pin-simple-slash'}
                size={20}
                color={
                  root.hovered
                    ? theme.colors.accent
                    : pinned
                      ? theme.colors.accent
                      : pin.hovered
                        ? theme.colors.foreground
                        : theme.colors.mutedForeground
                }
              />
            )}
          </Pressable>
        </>}
      </>}
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 4,
    transition: 'all 0.3s ease-in-out',
  },
  vertical: {
    flex: 20,
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
  contents: {
    flex: 1,
    transition: 'opacity 0.2s',
  },
  contentsMinimized: {
    pointerEvents: 'none',
    opacity: 0.2,
  },
  contentsHovered: {
    opacity: 1,
  },
  contentsPinned: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  pin: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: theme.display.space2,
  },
  close: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: theme.display.space2,
  },
}));
