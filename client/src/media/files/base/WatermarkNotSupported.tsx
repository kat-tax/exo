import {Trans} from '@lingui/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Button} from 'design';

export function WatermarkNotSupported() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <Trans>No Preview Available</Trans>
      </Text>
      <Button
        label="Download"
        mode="Primary"
        state="Default"
        onPress={() => {
          console.log('Download');
        }}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    gap: theme.display.space3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.display.space9,
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
