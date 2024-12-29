import {Book} from 'react-exo/book';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

export interface FileSpreadsheet extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileSpreadsheet) => {
  const {styles} = useStyles(stylesheet);
  const sheet = useFileData(props.path, 'dataUrl');

  return sheet ? (
    <Book
      url={sheet}
      style={styles.root}
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
