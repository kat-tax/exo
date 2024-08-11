import {Image} from 'react-exo/image';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileUrl} from 'media/hooks/useFileUrl';

interface FileImage {
  path: string,
  name: string,
  extension: string,
  maximized: boolean,
}

export function FileImage(props: FileImage) {
  const {styles} = useStyles(stylesheet);
  const urlImage = useFileUrl(props.path);

  return urlImage ? (
    <Image
      url={urlImage}
      resizeMode={props.maximized ? 'contain' : 'cover'}
      style={[
        styles.root,
        props.maximized && styles.maximized,
      ]}
    />
  ) : null;
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
  },
  maximized: {
    margin: theme.display.space3,
  },
}));
