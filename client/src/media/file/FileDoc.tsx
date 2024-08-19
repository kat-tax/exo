import {Book} from 'react-exo/book';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';
import type {BookRef} from 'react-exo/book';

interface FileDoc extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileDoc, ref: React.Ref<BookRef>) => {
  const {styles} = useStyles(stylesheet);
  const document = useDataUrl(props.path);

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
