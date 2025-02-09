import {Book} from 'react-exo/book';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';

export interface FileModel extends FileProps {}

export default forwardRef((props: FileModel) => {
  const source = useFile(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  // TODO: Implement model viewer (glb)
  // Native: https://github.com/rastapasta/react-native-gl-model-view
  // Web: https://github.com/google/model-viewer
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
