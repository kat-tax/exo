import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Media = {
  selection: string[];
}

export default createSlice({
  name: 'media',
  initialState: <Media> {
    selection: [],
  },
  selectors: {
    getSelection: (media) => media.selection,
  },
  reducers: {
    setSelection(media, action: PayloadAction<string[]>) {
      media.selection = action.payload;
    },
  },
});
