import {Book} from 'react-exo/book';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';

export interface FileNote extends FileProps {}

export default forwardRef((props: FileNote) => {
  const source = useFileData(props.path, 'dataUrl');
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
