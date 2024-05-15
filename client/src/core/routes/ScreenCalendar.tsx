import {View} from 'react-native';
import {Calendar, toDateId, useDateRange} from 'react-exo/calendar';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLocale} from 'settings/hooks/useLocale';
// import {useMemo} from 'react';

const today = toDateId(new Date());

export default function ScreenCalendar() {
  const {styles} = useStyles(stylesheet);
  const [locale] = useLocale();
  const range = useDateRange();
  return (
    <View style={styles.root}>
      <Calendar.List
        calendarFormatLocale={locale}
        calendarInitialMonthId={today}
        calendarActiveDateRanges={range.calendarActiveDateRanges}
        onCalendarDayPress={range.onCalendarDayPress}
        theme={undefined/*useMemo(() => ({
          rowMonth: {
            content: {
              fontWeight: '700',
              textAlign: 'left',
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          rowWeek: {
            container: {
              borderStyle: 'solid',
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            },
          },
          itemWeekName: {
            content: {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          itemDayContainer: {
            activeDayFiller: {
              backgroundColor: theme.colors.secondary,
            },
          },
          itemDay: {
            idle: ({isPressed, isWeekend}) => ({
              container: {
                borderRadius: 4,
                backgroundColor: isPressed
                  ? theme.colors.secondary
                  : 'transparent',
              },
              content: {
                color: isWeekend && !isPressed
                  ? 'rgba(255, 255, 255, 0.5)'
                  : theme.colors.foreground,
              },
            }),
            today: ({isPressed}) => ({
              container: {
                borderColor: theme.colors.primary,
                borderRadius: isPressed ? 4 : 30,
                backgroundColor: isPressed
                  ? theme.colors.secondary
                  : 'transparent',
              },
              content: {
                color: isPressed
                  ? theme.colors.foreground
                  : 'rgba(255, 255, 255, 0.5)',
              },
            }),
            active: ({isEndOfRange, isStartOfRange}) => ({
              container: {
                backgroundColor: theme.colors.secondary,
                borderTopLeftRadius: isStartOfRange ? 4 : 0,
                borderTopRightRadius: isEndOfRange ? 4 : 0,
                borderBottomLeftRadius: isStartOfRange ? 4 : 0,
                borderBottomRightRadius: isEndOfRange ? 4 : 0,
              },
              content: {
                color: theme.colors.foreground,
              },
            }),
          },
        }), [theme])*/}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
  },
}));
