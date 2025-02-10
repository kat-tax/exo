import {Code} from 'react-exo/code';
import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';
import {useTheme} from 'app/hooks/use-display';
import {bytesize} from 'app/utils/formatting';

import type {FileProps} from 'media/file';
import type {CodeLanguages} from 'react-exo/code';

export interface FileText extends FileProps {
  language: CodeLanguages,
}

export default forwardRef((props: FileText, _ref: React.Ref<View>) => {
  const source = useFile(props.path, 'text');
  const {styles} = useStyles(stylesheet);
  const [scheme] = useTheme();

  // Update file player bar info
  useEffect(() => {
    if (!source) return;
    const size = bytesize(source.length);
    props.actions.setInfo(`${source.split('\n').length} lines, ${size}`);
  }, [source, props.actions]);

  return source ? (
    <View style={styles.root}>
      <Code
        lang={props.language ?? 'text'}
        theme={scheme === 'dark' ? 'dark-plus' : 'light-plus'}>
        {source}
      </Code>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space3,
    paddingTop: theme.display.space2,
    color: theme.colors.foreground,
  },
}));