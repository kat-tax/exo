import {Icon} from 'react-exo/icon';
import {useNavigate} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, Pressable} from 'react-native';
import {useMemo, useState} from 'react';
import {resolve} from 'media/utils/path';

import {FileDownload} from './FileDownload';
import {FileMarkdown} from './FileMarkdown';
import {FileImage} from './FileImage';
import {FileGame} from './FileGame';
import {FilePDF} from './FilePDF';

interface FileProps {
  file: string,
  vertical: boolean,
  maximized: boolean,
  close: () => void,
}

export function File(props: FileProps) {
  const {file, vertical, maximized, close} = props;
  const [pointer, setPointer] = useState(false);
  const [pinned, setPinned] = useState(false);
  const {styles, theme} = useStyles(stylesheet);
  const screen = useWindowDimensions();
  const navigate = useNavigate();
  const parts = resolve(file);
  const path = parts.join('/');
  const [name, extension] = parts.slice(-1)[0].split('.') ?? [];
  const fileUrl = `/browse/${parts.slice(0, -1).join('/')}#${name}.${extension}`;

  const renderer = useMemo(() => {
    if (!extension) return null;
    const $ = {path, name, extension, maximized};
    switch (extension.toLowerCase()) {
      // Images
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'ico':
      case 'tiff':
      case 'webp':
      case 'avif':
      case 'heic':
      case 'heif':
      case 'svg':
      case 'raw':
        return <FileImage {...$}/>
      // Documents
      case 'pdf':
        return <FilePDF {...$}/>
      // Markdown
      case 'md':
      case 'mdx':
      case 'markdown':
        return <FileMarkdown {...$}/>
      // Roms
      case 'n64':
      case 'v64':
      case 'z64':
        return <FileGame {...$} platform="n64"/>
      case 'gb':
      case 'gbc':
        return <FileGame {...$} platform="gb"/>
      case 'gba':
        return <FileGame {...$} platform="gba"/>
      case 'nds':
        return <FileGame {...$} platform="nds"/>
      case 'nes':
        return <FileGame {...$} platform="nes"/>
      case 'sfc':
      case 'smc':
        return <FileGame {...$} platform="snes"/>
      case 'psx':
        return <FileGame {...$} platform="psx"/>
      case 'gen':
        return <FileGame {...$} platform="segaMD"/>
      case 'sms':
        return <FileGame {...$} platform="segaMS"/>
      case 'gg':
        return <FileGame {...$} platform="segaGG"/>
      case 'scd':
        return <FileGame {...$} platform="segaCD"/>
      case '32x':
        return <FileGame {...$} platform="sega32x"/>
      case 'sat':
        return <FileGame {...$} platform="segaSaturn"/>
      case 'a78':
        return <FileGame {...$} platform="atari7800"/>
      case 'a26':
        return <FileGame {...$} platform="atari2600"/>
      case 'jag':
      case 'j64':
        return <FileGame {...$} platform="jaguar"/>
      case 'lnx':
        return <FileGame {...$} platform="lynx"/>
      case 'pce':
        return <FileGame {...$} platform="pce"/>
      case 'pcfx':
        return <FileGame {...$} platform="pcfx"/>
      case 'ngp':
        return <FileGame {...$} platform="ngp"/>
      case 'vb':
        return <FileGame {...$} platform="vb"/>
      case 'ws':
      case 'wsc':
        return <FileGame {...$} platform="ws"/>
      case 'col':
        return <FileGame {...$} platform="coleco"/>
      case 'd64':
      case 't64':
      case 'prg':
        return <FileGame {...$} platform="vice_x64"/>
      // Unsupported
      default:
        return <FileDownload {...$}/>
    }
  }, [extension, name, path, maximized]);

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

  return renderer ? (
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
          {renderer}
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
  ) : null;
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
