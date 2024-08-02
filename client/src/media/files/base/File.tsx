import {useMemo} from 'react';
import {useNavigate} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';
import {resolve} from 'media/files/utils/path';

import {FileDownload} from './FileDownload';
import {FileGame} from './FileGame';
import {FilePDF} from './FilePDF';

interface FileProps {
  file: string,
  maximized: boolean,
  close: () => void,
}

export function File(props: FileProps) {
  const {file, maximized, close} = props;
  const {styles, theme} = useStyles(stylesheet);
  const navigate = useNavigate();
  const parts = resolve(file);
  const path = parts.join('/');
  const [name, ext] = parts.slice(-1)[0].split('.') ?? [];
  const fileUrl = `/browse/${parts.slice(0, -1).join('/')}#${name}.${ext}`;

  const renderer = useMemo(() => {
    if (!ext) return null;
    switch (ext) {
      case 'pdf':
        return <FilePDF {...{path, name}}/>
      case 'gb':
      case 'gbc':
        return <FileGame {...{path, name}} platform="gb"/>
      case 'gba':
        return <FileGame {...{path, name}} platform="gba"/>
      case 'nes':
        return <FileGame {...{path, name}} platform="nes"/>
      case 'snes':
        return <FileGame {...{path, name}} platform="snes"/>
      case 'z64':
        return <FileGame {...{path, name}} platform="n64"/>
      default:
        return <FileDownload {...{path, name}}/>
    }
  }, [ext, name, path]);

  const resolution = useMemo(() => {
    switch (ext) {
      case 'gb':
      case 'gbc':
      case 'gba':
        return [160 * 2, 144 * 2];
      case 'pdf':
        return [414, 252];
      default:
        return [320, 240];
    }
  }, [ext]);

  return renderer ? (
    <Pressable
      style={[
        styles.root,
        maximized ? styles.maximized : styles.minimized,
        !maximized && {width: resolution[0], height: resolution[1]},
      ]}
      onPress={() => navigate(fileUrl)}>
      {root => <>
        <View style={[
          styles.contents,
          !maximized && styles.contentsMinimized,
          root.hovered && {opacity: 1},
        ]}>
          {renderer}
        </View>
        {!maximized &&
          <Pressable style={styles.close} onPress={close}>
            {close => (
              <Icon
                name="ph:x"
                size={20}
                color={close.hovered
                  ? theme.colors.foreground
                  : theme.colors.mutedForeground
                }
              />
            )}
          </Pressable>
        }
      </>}
    </Pressable>
  ) : null;
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 2,
  },
  maximized: {
    maxWidth: '100%',
    maxHeight: '100%',
    paddingTop: theme.display.space2,
    paddingRight: theme.display.space2,
  },
  minimized: {
    overflow: 'hidden',
    position: 'absolute',
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
  close: {
    position: 'absolute',
    top: theme.display.space2,
    right: theme.display.space2,
  },
}));
