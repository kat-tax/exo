import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';
import {Markdown} from 'app/stacks/markdown';

import type {FileProps} from 'media/file';

export interface FileTypst extends FileProps {}

export default forwardRef((props: FileTypst) => {
  const source = useFileData(props.path, 'text');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <View style={styles.root}>
      <Markdown text={source}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: theme.display.space3,
  },
}));
