import {StyleSheet} from 'react-native-unistyles';
import {Panel} from 'app/ui/panel';
import {View, Text} from 'react-native';

export default function ScreenStorage() {
  return (
    <Panel>
      <View style={styles.root}>
        <Text>Storage</Text>
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
  },
}));
