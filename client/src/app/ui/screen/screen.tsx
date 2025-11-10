import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

export interface ScreenProps extends React.PropsWithChildren {
}

export function Screen(props: ScreenProps) {

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: {
      initial: theme.colors.card,
      xs: 'transparent',
    },
    paddingTop: {
      initial: rt.insets.top / 2,
      xs: 0,
    },
  },
  inner: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    _web: {
      borderWidth: {
        initial: 0,
        xs: StyleSheet.hairlineWidth,
      },
      borderRadius: {
        initial: 0,
        xs: theme.display.radius2,
      },
      marginLeft: {
        initial: 0,
        xs: theme.display.space2,
      },
      marginTop: {
        initial: 0,
        xs: theme.display.space2,
      },
      marginBottom: {
        initial: 0,
        xs: theme.display.space2,
      },
    }
  },
}));
