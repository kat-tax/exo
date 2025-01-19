import {Pdf} from 'react-exo/pdf';

import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';

export interface FilePdf extends FileProps {}

export default forwardRef((props: FilePdf) => {
  const source = useFileData(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);
  const {actions} = props;
  return source ? (
    <View style={styles.root}>
      <Pdf
        src={source}
        onPageChange={page => {
          actions.setInfo(`Page ${page || 1}`);
        }}
      />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
