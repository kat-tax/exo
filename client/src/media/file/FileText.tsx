import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';
import {Markdown} from 'app/stacks/Markdown';

import type {FileProps} from 'media/file';

interface FileText extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileText) => {
  const {styles} = useStyles(stylesheet);
  const text = useFileData(props.path, 'text');

  return text ? (
    <View style={styles.root}>
      <Markdown text={text}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: theme.display.space3,
  },
}));
