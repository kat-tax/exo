import {Code} from 'react-exo/code';
import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

interface FileCode extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileCode, _ref: React.Ref<View>) => {
  const {styles} = useStyles(stylesheet);
  const source = useFileData(props.path, 'text');

  return source ? (
    <View style={styles.root}>
      <Code lang="typescript" theme="nord">
        {source}
      </Code>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: theme.display.space3,
  },
}));
