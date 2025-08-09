import {useRef} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {View, Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {Icon} from 'app/ui/base';

import type {ViewProps} from 'react-native';

interface GridCellProps extends ViewProps {
  focusKey: string;
  onSelect?: () => void;
  onEditSelect?: () => void;
}

export function GridCell(props: GridCellProps) {
  const _hovered = useRef(false);
  const {ref, focused} = useFocusable({
    focusKey: `grid-cell-${props.focusKey}`,
    onEnterPress: () => props.onSelect?.(),
  });

  return (
    <Pressable
      style={styles.root}
      onPress={() => props.onSelect?.()}
      onLongPress={() => props.onEditSelect?.()}>
      {root => (
        <View ref={ref} style={[styles.inner, focused && styles.focused]}>
          {props.children}
          {props.onEditSelect && (
            <Pressable
              onPress={() => props.onEditSelect?.()}
              onHoverIn={() => {_hovered.current = true}}
              onHoverOut={() => {_hovered.current = false}}
              style={(e) => [
                styles.action,
                (e.hovered || root.hovered || _hovered.current) && styles.actionVisible,
              ]}>
              <Icon
                name="ph:pencil-simple"
                size={16}
                uniProps={(theme: any) => ({
                  color: theme.colors.mutedForeground,
                })}
              />
            </Pressable>
          )}
        </View>
      )}
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
  action: {
    position: 'absolute',
    top: theme.display.space1,
    right: theme.display.space1,
    padding: theme.display.space1,
    borderRadius: theme.display.radius2,
    backgroundColor: theme.colors.background,
    opacity: 0,
  },
  actionVisible: {
    opacity: 1,
  },
}));
