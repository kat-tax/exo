import {Lottie} from 'react-exo/lottie';

import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';

export interface FileLottie extends FileProps {}

export default forwardRef((props: FileLottie) => {
  const source = useFileData(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <View style={styles.root}>
      <Lottie
        url={source}
        resizeMode={props.maximized ? 'contain' : 'cover'}
        width={'100%'}
        autoplay
        loop
      />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
