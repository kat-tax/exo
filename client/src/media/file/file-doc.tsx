// import {Pdf} from 'react-exo/pdf';

import {forwardRef} from 'react';
// import {useStyles, createStyleSheet} from 'react-native-unistyles';
// import {useFile} from 'media/file/hooks/useFile';

import type {FileProps} from 'media/file';

export interface FileDoc extends FileProps {}

export default forwardRef((props: FileDoc) => {
  // const source = useFile(props.path, 'dataUrl');
  // const {styles} = useStyles(stylesheet);

  return null;
});

// const stylesheet = createStyleSheet(() => ({
//   root: {
//     flex: 1,
//   },
// }));
