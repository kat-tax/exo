import {Book} from 'react-exo/book';
import {forwardRef} from 'react';
import {StyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';

export interface FilePresentation extends FileProps {}

export default forwardRef(({path}: FilePresentation) => {
  const source = useFile(path, 'dataUrl');

  return source ? (
    <Book
      url={source}
      style={styles.root}
    />
  ) : null;
});

const styles = StyleSheet.create(() => ({
  root: {
    flex: 1,
  },
}));
