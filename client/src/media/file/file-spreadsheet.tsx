import {Book} from 'react-exo/book';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';

export interface FileSpreadsheet extends FileProps {}

export default forwardRef(({path}: FileSpreadsheet) => {
  const source = useFile(path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <Book
      url={source}
      style={styles.root}
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
