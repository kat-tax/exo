import {Calendar as CalendarBase} from '@marceloterreiro/flash-calendar';
import type {CalendarProps} from './Calendar.interface';

export function Calendar(props: CalendarProps) {
  return (
    <CalendarBase {...props}/>
  );
}
