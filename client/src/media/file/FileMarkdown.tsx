import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';
import {Markdown} from 'app/stacks/Markdown';

import type {FileProps} from 'media/file';

export interface FileMarkdown extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileMarkdown) => {
  const {styles} = useStyles(stylesheet);
  const markdown = useFileData(props.path, 'text');

  return markdown ? (
    <View style={styles.root}>
      <Markdown text={markdown}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space3,
  },
}));
