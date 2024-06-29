import {createSlice} from 'react-exo/redux';

import type {PayloadAction} from 'react-exo/redux';
import type {CalendarDayMetadata, CalendarActiveDateRange} from 'react-exo/calendar';

export type Events = {
  events: {
    [id: string]: {
      info: EventInfo,
      meta: CalendarDayMetadata,
      range: CalendarActiveDateRange,
    },
  };
};

export type EventInfo = {
  title: string,
  description: string,
};

export type EventSet = PayloadAction<{
  id: string,
  info: EventInfo,
  range: CalendarActiveDateRange,
  meta: CalendarDayMetadata,
}>;

export default createSlice({
  name: 'events',
  initialState: <Events> {
    events: {},
  },
  selectors: {
    getEvent: (cal, id: string) => cal.events[id],
  },
  reducers: {
    setEvent(cal, action: EventSet) {
      const {id, info, range, meta} = action.payload;
      cal.events[id] = {info, range, meta};
    },
  },
});
