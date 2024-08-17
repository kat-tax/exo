import {Lottie} from 'react-exo/lottie';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileUrl} from 'media/hooks/useFileUrl';

import type {FileProps} from 'media/file';

interface FileLottie extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileLottie) => {
  const {styles} = useStyles(stylesheet);
  const lottie = useFileUrl(props.path);

  return lottie ? (
    <Lottie
      url={lottie}
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
