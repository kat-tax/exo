import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';
import {Markdown} from 'app/stacks/Markdown';

import type {FileProps} from 'media/file';

interface FileMarkdown extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileMarkdown) => {
  const {styles} = useStyles(stylesheet);
  const markdown = useDataUrl(props.path);

  return markdown ? (
    <View style={styles.root}>
      <Markdown text={markdown}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: theme.display.space3,
  },
}));
