import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';
import {useDateRange, toDateId, Calendar} from 'react-exo/calendar';
import {useCalendarTheme} from 'events/hooks/useCalendarTheme';
import {useLocale} from 'settings/hooks/useLocale';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const {styles} = useStyles(stylesheet);
  const [locale] = useLocale();
  const range = useDateRange();
  const theme = useCalendarTheme();

  return (
    <View style={styles.root}>
      <Calendar.List
        theme={theme}
        calendarFormatLocale={locale}
        calendarInitialMonthId={today}
        calendarActiveDateRanges={range.calendarActiveDateRanges}
        onCalendarDayPress={range.onCalendarDayPress}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
    marginHorizontal: 'auto',
    paddingHorizontal: _theme.display.space5,
    maxWidth: 800,
  },
}));
