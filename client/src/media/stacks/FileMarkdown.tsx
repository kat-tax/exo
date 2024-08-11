import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileText} from 'media/hooks/useFileText';
import {Markdown} from 'app/stacks/Markdown';

interface FileMarkdown {
  path: string,
  name: string,
  extension: string,
  maximized: boolean,
}

export function FileMarkdown(props: FileMarkdown) {
  const {styles} = useStyles(stylesheet);
  const mdText = useFileText(props.path);

  return mdText ? (
    <View style={styles.root}>
      <Markdown text={mdText}/>
    </View>
  ) : null;
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: theme.display.space3,
  },
}));
