import {Trans} from '@lingui/macro';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

export default function ScreenTeaser() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <Trans>Coming soon...</Trans>
      </Text>
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
