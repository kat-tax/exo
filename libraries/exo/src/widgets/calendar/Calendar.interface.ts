import type {CalendarProps as CalendarPropsBase} from '@marceloterreiro/flash-calendar';

export type CalendarComponent = (props: CalendarProps) => JSX.Element;
export interface CalendarProps extends CalendarPropsBase {}
