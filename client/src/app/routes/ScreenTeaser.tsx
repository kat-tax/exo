import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Lottie} from 'react-exo/lottie';
import {Page} from 'app/interface/Page';

export default function ScreenTeaser() {
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <Page>
      <View style={styles.root}>
        <Text style={styles.text}>
          {t`Feature in development...`}
        </Text>
        <Lottie
          loop
          autoplay
          width={320}
          height={320}
          url="https://get.ult.dev/samples/cat.lottie"
        />
      </View>
    </Page>
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
