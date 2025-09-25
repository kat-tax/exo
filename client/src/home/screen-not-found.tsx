import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {Panel} from 'app/ui/panel';
import cfg from 'config';
import {View, Text} from 'react-native';

export default function ScreenNotFound() {
  const {t} = useLingui();

  return (
    <Panel title={cfg.APP_NAME} message={t`Page not found`}>
      <View style={styles.root}>
        <Text style={styles.text}>:(</Text>
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size9,
    color: theme.colors.foreground,
  },
}));
