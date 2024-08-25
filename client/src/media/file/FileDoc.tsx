import {Book} from 'react-exo/book';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {BookRef} from 'react-exo/book';

interface FileDoc extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileDoc, ref: React.Ref<BookRef>) => {
  const {styles} = useStyles(stylesheet);
  const document = useFileData(props.path, 'dataUrl');

  return document ? (
    <Book
      ref={ref}
      url={document}
      style={styles.root}
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
