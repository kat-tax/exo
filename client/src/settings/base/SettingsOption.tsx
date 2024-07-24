import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

interface SettingsOptionProps extends React.PropsWithChildren {
  label: string,
  description: string,
}

export function SettingsOption(props: SettingsOptionProps) {
  const {styles} = useStyles(stylesheet);
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

const stylesheet = createStyleSheet(theme => ({
  root: {
    gap: theme.display.space5,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.display.space5,
    borderBottomWidth: 1,
    alignItems: {
      initial: 'flex-start',
      xs: 'center',
    },
    justifyContent: {
      initial: 'flex-start',
      xs: 'space-between',
    },
    flexDirection: {
      initial: 'column',
      xs: 'row',
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
