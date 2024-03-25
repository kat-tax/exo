import {Calendar as CalendarBase} from '@marceloterreiro/flash-calendar';
import type {CalendarComponent, CalendarProps} from './Calendar.interface';

export const Calendar: CalendarComponent = (props: CalendarProps) => {
  return (
    <CalendarBase {...props}/>
  );
}
