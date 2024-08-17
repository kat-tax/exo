import {Book} from 'react-exo/book';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileUrl} from 'media/hooks/useFileUrl';

import type {FileProps} from 'media/file';

interface FileDoc extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileDoc) => {
  const {styles} = useStyles(stylesheet);
  const document = useFileUrl(props.path);

  return document ? (
    <Book
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
