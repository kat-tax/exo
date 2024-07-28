import {Trans} from '@lingui/macro';
import {Lottie} from 'react-exo/lottie';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

export function WatermarkEmpty() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <Trans>Folder is empty</Trans>
      </Text>
      <Lottie
        loop
        autoplay
        width={120}
        height={120}
        url="https://lottie.host/1c4d1ad4-9341-4d99-9618-22c9eca5ad4f/k3r1IO3eMQ.lottie"
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
