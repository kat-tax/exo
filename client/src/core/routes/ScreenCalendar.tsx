import {Calendar, toDateId} from 'react-exo/calendar';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLocale} from 'settings/hooks/useLocale';
import {View} from 'react-native';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const {styles} = useStyles(stylesheet);
  const [locale] = useLocale();
  return (
    <View style={styles.root}>
      <Calendar.List
        onCalendarDayPress={console.log}
        calendarInitialMonthId={today}
        calendarActiveDateRanges={[{startId: today, endId: today}]}
        calendarFormatLocale={locale}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
  },
}));
