import {View} from 'react-native';
import {useEffect, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';
import {bytesize} from 'app/utils/formatting';
import {Markdown} from 'app/stacks/Markdown';

import type {FileProps} from 'media/file';

export interface FileMarkdown extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileMarkdown) => {
  const {styles} = useStyles(stylesheet);
  const markdown = useFileData(props.path, 'text');

  // Update file player bar info
  useEffect(() => {
    if (!markdown) return;
    props.setBarInfo(`${markdown.split('\n').length ?? 0} lines, ${bytesize(markdown.length)}`);
  }, [markdown, props.setBarInfo]);

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
