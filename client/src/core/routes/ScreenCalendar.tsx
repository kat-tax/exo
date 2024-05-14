import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'design/styles';
import {Calendar, toDateId} from 'react-exo/calendar';
import {View} from 'react-native';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const {styles} = useStyles(stylesheet);
  useLingui();
  return (
    <View style={styles.root}>
      <Calendar.List
        onCalendarDayPress={console.log}
        calendarInitialMonthId={today}
        calendarActiveDateRanges={[{startId: today, endId: today}]}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
  },
}));
