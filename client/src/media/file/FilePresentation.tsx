import {Book} from 'react-exo/book';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';

interface FilePresentation extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FilePresentation) => {
  const {styles} = useStyles(stylesheet);
  const slide = useDataUrl(props.path);

  return slide ? (
    <Book
      url={slide}
      style={styles.root}
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
