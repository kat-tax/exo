import {Trans} from '@lingui/react';
import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'design/styles';
import {getDayGreeting, getCurrentTime} from 'home/utils/date';
import {Page} from 'app/base/Page';

export default function ScreenHome() {
  const {styles} = useStyles(stylesheet);
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const i = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <Page title={<Trans id={getDayGreeting().id}/>}>
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
