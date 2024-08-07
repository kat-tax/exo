import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, ActivityIndicator} from 'react-native';
import type {ViewProps, ActivityIndicatorProps} from 'react-native';

export interface SpinnerProps extends ActivityIndicatorProps {
  container?: ViewProps,
}

export function Spinner({container, ...props}: SpinnerProps) {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <View style={styles.root} {...container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        {...props}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
