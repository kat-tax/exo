import {Pdf} from 'react-exo/pdf';
import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';
import type {PdfRef} from 'react-exo/pdf';

export type {PdfRef};

export interface FilePdf extends FileProps {
  ref: React.RefObject<PdfRef>,
}

export default forwardRef((
  {path, actions}: Omit<FilePdf, 'ref'>,
  ref: React.Ref<PdfRef>,
) => {
  const source = useFile(path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <View style={styles.root}>
      <Pdf
        ref={ref}
        src={source}
        onPageChange={(page, totalPages) => {
          actions.setInfo(`Page ${page || 1}/${totalPages}`);
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
