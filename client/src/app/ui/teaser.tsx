import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Lottie} from 'react-exo/lottie';

export function Teaser() {
  const {t} = useLingui();
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        {t`Feature in development...`}
      </Text>
      <Lottie
        loop
        autoplay
        width={240}
        height={240}
        url="https://get.ult.dev/samples/cat.lottie"
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontStyle: 'italic',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
  },
}));
