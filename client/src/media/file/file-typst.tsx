import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';
import {Markdown} from 'app/stacks/markdown';

import type {FileProps} from 'media/file';

export interface FileTypst extends FileProps {}

export default forwardRef((props: FileTypst) => {
  const source = useFile(props.path, 'text');
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
