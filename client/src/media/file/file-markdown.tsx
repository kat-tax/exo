import {View} from 'react-native';
import {bytesize} from 'react-exo/fs';
import {StyleSheet} from 'react-native-unistyles';
import {useEffect, forwardRef} from 'react';
import {useFile} from 'media/file/hooks/use-file';
import {Markdown} from 'app/ui/markdown';

import type {FileProps} from 'media/file';

export interface FileMarkdown extends FileProps {}

export default forwardRef(({path, actions}: FileMarkdown) => {
  const source = useFile(path, 'text');

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

const styles = StyleSheet.create((theme) => ({
  root: {
    padding: theme.display.space3,
  },
}));
