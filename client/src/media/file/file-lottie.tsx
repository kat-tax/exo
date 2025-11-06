import {Lottie} from 'react-exo/lottie';
import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';

export interface FileLottie extends FileProps {}

export default forwardRef(({path, maximized}: FileLottie) => {
  const source = useFile(path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <View style={styles.root}>
      <Lottie
        url={source}
        resizeMode={maximized ? 'contain' : 'cover'}
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
