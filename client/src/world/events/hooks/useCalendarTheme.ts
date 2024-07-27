import {useMemo} from 'react';
import {useStyles, UnistylesRuntime} from 'react-native-unistyles';

import type {CalendarTheme} from 'react-exo/calendar';

export function useCalendarTheme(): CalendarTheme {
  const {theme} = useStyles();
  return useMemo(() => ({
    rowMonth: {
      container: {
        marginTop: theme.display.space5,
      },
      content: {
        textAlign: 'center',
        color: theme.colors.foreground,
        fontFamily: theme.font.family,
        fontSize: theme.font.labelSize,
        fontWeight: theme.font.labelWeight,
        lineHeight: theme.font.labelHeight,
        letterSpacing: theme.font.labelSpacing,
      },
    },
    rowWeek: {
      container: {
        borderStyle: 'solid',
        borderBottomWidth: UnistylesRuntime.hairlineWidth,
        borderBottomColor: theme.colors.border,
      },
    },
    itemWeekName: {
      content: {
        color: theme.colors.mutedForeground,
        fontFamily: theme.font.family,
        fontSize: theme.font.size,
        fontWeight: theme.font.weight,
        lineHeight: theme.font.height,
        letterSpacing: theme.font.spacing,
      },
    },
    itemDayContainer: {
      activeDayFiller: {
        backgroundColor: theme.colors.secondary,
      },
    },
    itemDay: {
      base: () => ({
        container: {
          borderRadius: theme.display.radius3,
        },
        content: {
          color: theme.colors.foreground,
          fontFamily: theme.font.family,
          fontSize: theme.font.size,
          fontWeight: theme.font.weight,
          lineHeight: theme.font.height,
          letterSpacing: theme.font.spacing,
        },
      }),
      idle: ({isPressed, isWeekend}) => ({
        content: {
          color: isWeekend && !isPressed
            ? theme.colors.mutedForeground
            : theme.colors.foreground,
        },
      }),
      today: ({isPressed}) => ({
        container: {
          borderColor: theme.colors.ring,
          backgroundColor: isPressed
            ? theme.colors.secondary
            : 'transparent',
        },
      }),
      active: ({isEndOfRange, isStartOfRange}) => ({
        container: {
          backgroundColor: theme.colors.secondary,
          borderTopLeftRadius: isStartOfRange ? theme.display.radius3 : 0,
          borderTopRightRadius: isEndOfRange ? theme.display.radius3 : 0,
          borderBottomLeftRadius: isStartOfRange ? theme.display.radius3 : 0,
          borderBottomRightRadius: isEndOfRange ? theme.display.radius3 : 0,
        },
        content: {
          color: theme.colors.secondaryForeground,
        },
      }),
    },
  } as CalendarTheme), [theme])
}
