import {Trans} from '@lingui/macro';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDateRange, toDateId, Calendar} from 'react-exo/calendar';
import {useCalendarTheme} from 'events/hooks/useCalendarTheme';
import {useLocale} from 'settings/hooks/useLocale';
import {Event} from 'events/base/Event';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const {styles} = useStyles(stylesheet);
  const calendarTheme = useCalendarTheme();
  const [locale] = useLocale();
  const range = useDateRange();
  const hasEvent = false;

  return (
    <View style={styles.root}>
      <View style={styles.calendar}>
        <Calendar.List
          theme={calendarTheme}
          calendarFormatLocale={locale}
          calendarInitialMonthId={today}
          calendarActiveDateRanges={range.calendarActiveDateRanges}
          onCalendarDayPress={range.onCalendarDayPress}
        />
      </View>
      <View style={styles.panel}>
        {hasEvent
          ? <Event/>
          : <View style={styles.empty}>
              <Text style={styles.emptyText}>
                <Trans>No events scheduled.</Trans>
              </Text>
            </View>
        }
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    flexDirection: {
      initial: 'column',
      sm: 'row',
    },
  },
  calendar: {
    flex: {
      initial: 1,
      md: 2,
    },
    marginHorizontal: {
      initial: 0,
      xs: theme.display.space3,
    },
  },
  panel: {
    flex: {
      initial: 0,
      xs: 1,
    },
    gap: theme.display.space3,
    flexWrap: 'wrap',
    padding: theme.display.space5,
    borderColor: theme.colors.secondary,
    borderLeftWidth: {
      initial: 0,
      sm: 1,
    },
    borderTopWidth: {
      initial: 1,
      sm: 0,
    },
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
