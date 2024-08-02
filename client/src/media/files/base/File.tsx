import {useMemo} from 'react';
import {useNavigate} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Pressable} from 'react-native';
import {resolve} from 'media/files/utils/path';

import {FileDownload} from './FileDownload';
import {FileGame} from './FileGame';
import {FilePDF} from './FilePDF';

interface FileProps {
  file: string,
  maximized: boolean,
}

export function File(props: FileProps) {
  const {file, maximized} = props;
  const {styles} = useStyles(stylesheet);
  const navigate = useNavigate();
  const parts = resolve(file);
  const path = parts.join('/');
  const [name, ext] = parts.slice(-1)[0].split('.') ?? [];
  const fileUrl = `/browse/${parts.slice(0, -1).join('/')}#${name}.${ext}`;
  const vstyles = {
    root: [
      styles.root,
      maximized ? styles.maximized : styles.minimized,
    ],
    contents: [
      styles.contents,
      !maximized && styles.contentsMinimized,
    ],
  };

  const previewer = useMemo(() => {
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
      default:
        return <FileDownload {...{path, name}}/>
    }
  }, [ext, name, path]);

  return previewer ? (
    <Pressable
      style={vstyles.root}
      onPress={() => navigate(fileUrl)}>
      <View style={vstyles.contents}>
        {previewer}
      </View>
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
    position: 'absolute',
    bottom: theme.display.space5,
    right: theme.display.space5,
    width: 160 * 2,
    height: 144 * 2,
    borderWidth: rt.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 2px 1px',
  },
  contents: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: theme.display.radius1,
  },
  contentsMinimized: {
    pointerEvents: 'none',
  },
}));
