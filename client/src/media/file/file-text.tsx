import {Code} from 'react-exo/code';
import {View} from 'react-native';
import {bytesize} from 'react-exo/fs';
import {forwardRef, useEffect} from 'react';
import {StyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';
import {useTheme} from 'settings/hooks/use-theme';

import type {FileProps} from 'media/file';
import type {CodeLanguages} from 'react-exo/code';

export interface FileText extends FileProps {
  language: CodeLanguages,
}

export default forwardRef(({path, language, actions}: FileText, _ref: React.Ref<View>) => {
  const source = useFile(path, 'text');
  const [scheme] = useTheme();

  useEffect(() => {
    if (!source) return;
    const size = bytesize(source.length);
    actions.setInfo(`${source.split('\n').length} lines, ${size}`);
  }, [source, actions]);

  return source ? (
    <View style={styles.root}>
      <Code
        lang={language ?? 'text'}
        theme={scheme === 'dark' ? 'dark-plus' : 'light-plus'}>
        {source}
      </Code>
    </View>
  ) : null;
});

const styles = StyleSheet.create((theme) => ({
  root: {
    padding: theme.display.space3,
    paddingTop: theme.display.space2,
    color: theme.colors.foreground,
  },
}));
