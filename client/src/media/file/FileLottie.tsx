import {Lottie} from 'react-exo/lottie';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';

export interface FileLottie extends FileProps {}

export default forwardRef((props: FileLottie) => {
  const source = useFileData(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <Lottie
      url={source}
      loop={true}
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
