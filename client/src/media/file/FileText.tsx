import {Code} from 'react-exo/code';

import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'app/hooks/useScheme';
import {useFileData} from 'media/hooks/useFileData';

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
    margin: theme.display.space3,
    paddingBottom: theme.display.space3,
  },
}));