import {Image} from 'react-exo/image';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileUrl} from 'media/hooks/useFileUrl';

import type {FileProps} from 'media/file';

interface FileImage extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileImage, _ref) => {
  const {styles} = useStyles(stylesheet);
  const image = useFileUrl(props.path);

  return image ? (
    <Image
      url={image}
      resizeMode={props.maximized ? 'contain' : 'cover'}
      style={[
        styles.root,
        props.maximized && styles.maximized,
      ]}
    />
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
  },
  maximized: {
    margin: theme.display.space3,
  },
}));
