import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';

interface FilePdf extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FilePdf) => {
  const {styles} = useStyles(stylesheet);
  const pdf = useDataUrl(props.path, 'application/pdf');

  // TODO: Implement PDF in library
  // Native: https://github.com/douglasjunior/react-native-pdf-renderer
  // React: https://github.com/wojtekmaj/react-pdf
  return pdf ? (
    <View style={styles.root}>
      <embed
        title={props.name}
        src={`${pdf}#view=FitH&navpanes=0`}
        style={{height: '100%', width: '100%'}}
        type="application/pdf"
        height="100%"
        width="100%"
      />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
