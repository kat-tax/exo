import {Text} from 'react-native';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'design/styles';
import {getGreeting} from 'core/utils/date';
import {Page} from 'core/base/Page';

export default function ScreenHome() {
  const {styles} = useStyles(stylesheet);
  useLingui();
  return (
    <Page>
      <Text style={styles.greeting}>
        {getGreeting()}
      </Text>
    </Page>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  greeting: {
    fontSize: 16,
    lineHeight: 32,
  },
}));
