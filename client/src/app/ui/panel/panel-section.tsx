import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

interface PanelSectionProps extends React.PropsWithChildren {
  title: string,
}

export function PanelSection(props: PanelSectionProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
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
