import {Text} from 'react-native';
import {useLingui} from '@lingui/react';
import {useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'design/styles';
import {getDayGreeting, getCurrentTime} from 'core/utils/date';
import {Page} from 'core/base/Page';

export default function ScreenHome() {
  const {styles} = useStyles(stylesheet);
  const [time, setTime] = useState(getCurrentTime());

  useLingui();
  useEffect(() => {
    const i = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <Page title={getDayGreeting()}>
      <Text style={styles.clock}>
        {time}
      </Text>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  clock: {
    fontSize: 32,
    fontWeight: '100',
    color: theme.colors.foreground,
  },
}));
