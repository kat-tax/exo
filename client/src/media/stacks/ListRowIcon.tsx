import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

interface ListRowIcon {
  name: string,
  ext: string,
}

// https://github.com/kat-tax/vslite/tree/master/src/icons
export function ListRowIcon(_props: ListRowIcon) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    width: 16,
    height: 16,
  },
}));
