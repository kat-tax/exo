import {Trans} from '@lingui/macro';
import {Lottie} from 'react-exo/lottie';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

export default function ScreenTeaser() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <Trans>Work in progress...</Trans>
      </Text>
      <Lottie
        loop
        autoplay
        width={320}
        height={320}
        url="https://lottie.host/2d9ae633-1c02-4ce7-9fec-421b24005be5/pj1clD0icO.lottie"
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
    fontStyle: 'italic',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
  },
}));
