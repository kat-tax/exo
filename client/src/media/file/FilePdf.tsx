import {Pdf} from 'react-exo/pdf';
import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

interface FilePdf extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FilePdf) => {
  const {styles} = useStyles(stylesheet);
  const pdf = useFileData(props.path, 'dataUrl');

  return pdf ? (
    <View style={styles.root}>
      <Pdf url={pdf} />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
