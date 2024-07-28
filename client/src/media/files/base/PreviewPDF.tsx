import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileDataURL} from 'media/files/hooks/useFileDataURL';

interface PreviewPDF {
  path: string,
}

export function PreviewPDF(props: PreviewPDF) {
  const {styles} = useStyles(stylesheet);
  const dataURL = useFileDataURL(props.path, 'application/pdf');

  return (
    <View style={styles.root}>
      <embed
        src={dataURL}
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
