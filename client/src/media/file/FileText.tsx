import {Code} from 'react-exo/code';

import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';
import {useScheme} from 'app/hooks/useScheme';
import {bytesize} from 'app/utils/formatting';

import type {FileProps} from 'media/file';

export interface FileText extends FileProps {
  name: string,
  extension: string,
  language: string,
}

export default forwardRef((props: FileText, _ref: React.Ref<View>) => {
  const [scheme] = useScheme();
  const {styles} = useStyles(stylesheet);
  const source = useFileData(props.path, 'text');

  // Update file player bar info
  useEffect(() => {
    if (!source) return;
    const size = bytesize(source.length);
    props.setBarInfo(`${source.split('\n').length} lines, ${size}`);
  }, [source, props.setBarInfo]);

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
  },
}));