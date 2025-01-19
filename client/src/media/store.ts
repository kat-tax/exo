import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Media = {
  focused: string;
  selected: string[];
  dragging: boolean;
}

export default createSlice({
  name: 'media',
  initialState: <Media> {
    focused: '',
    selected: [],
    dragging: false,
  },
  selectors: {
    getFocused: (media) => media.focused,
    getSelected: (media) => media.selected,
    getDragging: (media) => media.dragging,
  },
  reducers: {
    setFocused(media, action: PayloadAction<string>) {
      media.focused = action.payload;
    },
    setSelected(media, action: PayloadAction<string[]>) {
      media.selected = action.payload;
    },
    setDragging(media, action: PayloadAction<boolean>) {
      media.dragging = action.payload;
    },
  },
});
