import {Book} from 'react-exo/book';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

interface FileNote extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileNote) => {
  const {styles} = useStyles(stylesheet);
  const note = useFileData(props.path, 'dataUrl');

  return note ? (
    <Book
      url={note}
      style={styles.root}
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
