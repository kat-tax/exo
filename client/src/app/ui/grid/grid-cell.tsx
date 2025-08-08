import {View, Pressable} from 'react-native';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {StyleSheet} from 'react-native-unistyles';

import type {ViewProps} from 'react-native';

interface GridCellProps extends ViewProps {
  focusKey: string;
  onSelect?: () => void;
}

export function GridCell(props: GridCellProps) {
  const {ref, focused} = useFocusable({
    focusKey: `grid-cell-${props.focusKey}`,
  });

  return (
    <Pressable
      style={styles.root}
      onPress={() => props.onSelect?.()}>
      <View ref={ref} style={[styles.inner, focused && styles.focused]}>
        {props.children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.display.space1,
    width: {
      initial: '100%',  // 1 col
      xxxs: '50%',      // 2 col
      xxs: '33%',       // 3 col
      xs: '33%',        // 3 col
      sm: '20%',        // 5 col
      md: '16.666%',    // 6 col
      lg: '14.2857%',   // 7 col
      xl: '12.5%',      // 8 col
    },
  },
  inner: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: theme.display.radius3,
  },
  focused: {
    borderColor: theme.colors.ring,
  },
}));
