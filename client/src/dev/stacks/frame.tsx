import {StyleSheet} from 'react-native-unistyles';
import {View, ScrollView, Text} from 'react-native';

export interface FrameProps {
  title: string,
  children?: React.ReactNode,
}

export function Frame(props: FrameProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <ScrollView horizontal contentContainerStyle={styles.content}>
        {props.children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    gap: theme.display.space7,
    marginBottom: theme.display.space5,
    paddingBottom: theme.display.space5,
    paddingHorizontal: theme.display.space3,
    borderColor: theme.colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
    borderRadius: 4,
  },
  title: {
    padding: theme.display.space3,
    paddingBottom: 0,
    color: theme.colors.mutedForeground,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.display.space3,
  },
}));
