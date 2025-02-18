import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

interface PanelSectionProps extends React.PropsWithChildren {
  title: string,
}

export function PanelSection(props: PanelSectionProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text style={styles.header}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    gap: theme.display.space5,
  },
  header: {
    fontFamily: theme.font.family,
    fontSize: theme.font.labelSize,
    fontWeight: theme.font.labelWeight,
    lineHeight: theme.font.labelHeight,
    letterSpacing: theme.font.labelSpacing,
    color: theme.colors.foreground,
  },
}));
