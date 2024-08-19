import {Image} from 'react-exo/image';
import {useState, useImperativeHandle, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';

interface FileImage extends FileProps {
  name: string,
  extension: string,
}

export interface ImageRef {
  increase: () => void,
  decrease: () => void,
  reset: () => void,
}

export default forwardRef((props: FileImage, ref: React.Ref<ImageRef>) => {
  const [scale, setScale] = useState(1);
  const {styles} = useStyles(stylesheet);
  const image = useDataUrl(props.path);

  useImperativeHandle(ref, () => ({
    increase: () => {
      setScale(scale + 0.1);
    },
    decrease: () => {
      setScale(scale - 0.1);
    },
    reset: () => {
      setScale(1);
    },
  }));

  return image ? (
    <Image
      url={image}
      resizeMode={props.maximized ? 'contain' : 'cover'}
      style={[
        styles.root,
        props.maximized && styles.maximized,
        {transform: [{scale}]},
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
