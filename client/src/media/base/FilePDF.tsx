import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileUrl} from 'media/hooks/useFileUrl';

interface FilePDF {
  path: string,
  name: string,
  extension: string,
  maximized: boolean,
}

export function FilePDF(props: FilePDF) {
  const {styles} = useStyles(stylesheet);
  const urlPdf = useFileUrl(props.path, 'application/pdf');

  return urlPdf ? (
    <View style={styles.root}>
      <embed
        title={props.name}
        src={`${urlPdf}#view=FitH&navpanes=0`}
        style={{height: '100%', width: '100%'}}
        type="application/pdf"
        height="100%"
        width="100%"
      />
    </View>
  ) : null;
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
