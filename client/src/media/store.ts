import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Media = {
  dragging: boolean;
  selection: string[];
}

export default createSlice({
  name: 'media',
  initialState: <Media> {
    dragging: false,
    selection: [],
  },
  selectors: {
    getSelection: (media) => media.selection,
    getDragging: (media) => media.dragging,
  },
  reducers: {
    setSelection(media, action: PayloadAction<string[]>) {
      media.selection = action.payload;
    },
    setDragging(media, action: PayloadAction<boolean>) {
      media.dragging = action.payload;
    },
  },
});
