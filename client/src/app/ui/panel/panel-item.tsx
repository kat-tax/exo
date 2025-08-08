import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

interface PanelItemProps extends React.PropsWithChildren {
  label: string,
  description: string,
}

export function PanelItem(props: PanelItemProps) {
  return (
    <View style={styles.root}>
      <View style={styles.info}>
        <Text style={styles.label}>
          {props.label}
        </Text>
        <Text style={styles.description}>
          {props.description}
        </Text>
      </View>
      <View>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    gap: theme.display.space5,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.display.space5,
    borderBottomWidth: 1,
    alignItems: {
      initial: 'flex-start',
      sm: 'center',
    },
    justifyContent: {
      initial: 'flex-start',
      sm: 'space-between',
    },
    flexDirection: {
      initial: 'column',
      sm: 'row',
    },
  },
  info: {
    gap: theme.display.space2,
  },
  label: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
  },
  description: {
    fontWeight: '300',
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));
