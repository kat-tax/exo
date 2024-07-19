import {Trans} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDateRange, toDateId, Calendar} from 'react-exo/calendar';
import {useCalendarTheme} from 'events/hooks/useCalendarTheme';
import {useLocale} from 'settings/hooks/useLocale';
import {Alert} from 'design';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const {styles} = useStyles(stylesheet);
  const calendarTheme = useCalendarTheme();
  const [locale] = useLocale();
  const range = useDateRange();

  const hasEvent = false;
  const demoStart = new Date('2024-07-28T12:00:00');
  const demoEnd = new Date('2024-07-28T14:00:00');
  const demoTitle = 'Birthday – Shiner, TX';
  const demo = `${demoStart.toLocaleDateString(locale, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  })} • ${demoStart.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  })} - ${demoEnd.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  })}`;

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
          ? <Alert
              mode="Default"
              header={demoTitle}
              body={demo}
              hasIcon
              icon={
                <Icon name="ph:cake"/>
              }
            />
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
