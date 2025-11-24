import {View, Text} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {useDateRange, toDateId} from '@marceloterreiro/flash-calendar';
import {CalendarList} from 'world/stacks/calendar-themed';
import {useLocale} from 'settings/hooks/use-locale';
import {Screen} from 'app/ui/screen';

import {CalendarEvent} from './stacks/calendar-event';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const dateRange = useDateRange();
  const [locale] = useLocale();
  const {t} = useLingui();

  const showPanel = false;
  const showDebugEvent = false;

  return (
    <Screen>
      <View style={styles.root}>
        <View style={styles.calendar}>
          <CalendarList
            calendarFormatLocale={locale}
            calendarInitialMonthId={today}
            calendarActiveDateRanges={dateRange.calendarActiveDateRanges}
            onCalendarDayPress={dateRange.onCalendarDayPress}
          />
        </View>
        {showPanel &&
          <View style={styles.panel}>
            {showDebugEvent
              ? <CalendarEvent/>
              : <View style={styles.empty}>
                  <Text style={styles.emptyText}>
                    {t`No events scheduled.`}
                  </Text>
                </View>
              }
          </View>
        }
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    flexDirection: {
      initial: 'column',
      sm: 'row',
    },
  },
  calendar: {
    flex: 1,
    marginHorizontal: {
      initial: 0,
      xs: theme.display.space3,
    },
  },
  panel: {
    flex: 1,
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
