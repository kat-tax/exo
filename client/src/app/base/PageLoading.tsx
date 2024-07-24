import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, ActivityIndicator} from 'react-native';
import type {ViewProps, ActivityIndicatorProps} from 'react-native';

export interface PageLoadingProps {
  container?: ViewProps,
  indicator?: ActivityIndicatorProps,
}

export function PageLoading(props: PageLoadingProps) {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <View style={styles.root} {...props.container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        {...props.indicator}
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
