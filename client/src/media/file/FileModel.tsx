import {Book} from 'react-exo/book';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

interface FileModel extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileModel) => {
  const {styles} = useStyles(stylesheet);
  const model = useFileData(props.path, 'dataUrl');

  // TODO: Implement model viewer (glb)
  // Native: https://github.com/rastapasta/react-native-gl-model-view
  // Web: https://github.com/google/model-viewer
  return model ? (
    <Book
      url={model}
      style={styles.root}
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
