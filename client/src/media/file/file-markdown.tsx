import {View} from 'react-native';
import {useEffect, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';
import {bytesize} from 'app/utils/formatting';
import {Markdown} from 'app/stacks/markdown';

import type {FileProps} from 'media/file';

export interface FileMarkdown extends FileProps {}

export default forwardRef(({path, actions}: FileMarkdown) => {
  const source = useFile(path, 'text');
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    if (!source) return;
    actions.setInfo(`${source.split('\n').length ?? 0} lines, ${bytesize(source.length)}`);
  }, [source, actions]);

  return source ? (
    <View style={styles.root}>
      <Markdown text={source}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space3,
  },
}));
