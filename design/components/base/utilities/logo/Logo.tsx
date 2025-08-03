import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Image} from 'react-exo/image';
import logo from 'brand/logo.svg';

export interface LogoProps {
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function Logo(props: LogoProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? "2237:443"}>
      <Image
        style={styles.logo}
        resizeMode={'contain'}
        url={logo}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 42,
    height: 42,
  },
}));
