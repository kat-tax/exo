import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileDataURL} from 'media/files/hooks/useFileDataURL';

interface FilePDF {
  path: string,
  name: string,
}

export function FilePDF(props: FilePDF) {
  const {styles} = useStyles(stylesheet);
  const urlPdf = useFileDataURL(props.path, 'application/pdf');

  return (
    <View style={styles.root}>
      <embed
        src={urlPdf}
        style={{height: '100%', width: '100%'}}
        type="application/pdf"
        height="100%"
        width="100%"
      />
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
