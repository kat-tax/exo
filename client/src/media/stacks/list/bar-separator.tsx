import {Icon} from 'react-exo/icon';
import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';

const SEPARATOR_SIZE = __TOUCH__ ? 14 : 10;

export function ListBarSeparator() {
  return (
    <View tabIndex={-1} style={styles.separator}>
      <Icon
        name="ph:caret-right"
        size={10}
        uniProps={(theme) => ({
          color: theme.colors.mutedForeground,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  separator: {
    width: SEPARATOR_SIZE,
    height: 10,
  },
}));
