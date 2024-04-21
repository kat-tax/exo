import {useStyles, createStyleSheet} from 'design/styles';
import {View, ActivityIndicator} from 'react-native';
import type {ViewProps, ActivityIndicatorProps} from 'react-native';

export interface PageLoadingProps {
  container?: ViewProps;
  indicator?: ActivityIndicatorProps;
}

export function PageLoading(props: PageLoadingProps) {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <View style={styles.root} {...props.container}>
      <ActivityIndicator
        color={theme.colors.primary}
        size="large"
        {...props.indicator}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
}));
