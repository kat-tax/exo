import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Media = {
  focused: string,
  contents: string[],
  selected: string[],
  dragging: string[],
  renaming: string[],
  copying: string[],
  moving: string[],
}

export default createSlice({
  name: 'media',
  initialState: <Media> {
    focused: '',
    contents: [],
    selected: [],
    dragging: [],
    renaming: [],
    copying: [],
    moving: [],
  },
  selectors: {
    getFocused: (media) => media.focused,
    getContents: (media) => media.contents,
    getSelected: (media) => media.selected,
    getDragging: (media) => media.dragging,
    getRenaming: (media) => media.renaming,
    getCopying: (media) => media.copying,
    getMoving: (media) => media.moving,
  },
  reducers: {
    list(media, action: PayloadAction<string[]>) {
      media.contents = action.payload;
    },
    focus(media, action: PayloadAction<string>) {
      media.focused = action.payload;
    },
    drag(media, action: PayloadAction<string | null>) {
      if (!action.payload) {
        media.dragging = [];
      } else if (!media.selected.includes(action.payload)) {
        media.focused = action.payload;
        media.selected = [action.payload];
        media.dragging = [action.payload];
      } else {
        media.dragging = media.selected;
      }
    },
    selectBulk(media, action: PayloadAction<string[] | 'all'>) {
      media.selected = action.payload === 'all' ? media.contents : action.payload;
      if (media.selected.length === 0) {
        media.focused = '';
      } else if (!media.focused) {
        media.focused = media.selected[media.selected.length - 1];
      }
    },
    selectRemove(media, action: PayloadAction<number>) {
      const index = action.payload;
      const removed = media.selected.splice(index, 1);
      if (removed.includes(media.focused)) {
        media.focused = media.selected[index] || media.selected[index - 1] || '';
      }
    },
    selectItem(media, action: PayloadAction<{
      path: string,
      isMulti: boolean,
      isRange: boolean,
    }>) {
      const {path, isMulti, isRange} = action.payload;
      const indexSelected = media.selected.indexOf(path);
      const indexLast = media.contents.indexOf(media.focused);
      const indexNew = media.contents.indexOf(path);
      // Range select (shift+click)
      if (isRange) {
        const start = Math.min(indexLast, indexNew);
        const end = Math.max(indexLast, indexNew);
        const rng = media.contents.slice(start, end + 1);
        media.selected = [...new Set([...media.selected, ...rng])];
      // Multi select (cmd+click)
      } else if (isMulti) {
        if (indexSelected !== -1) {
          media.selected.splice(indexSelected, 1);
        } else {
          media.selected.push(path);
        }
      // Single select (click)
      } else {
        media.selected = [path];
      }
      // Focus selected item
      if (media.selected.includes(path)) {
        media.focused = path;
      } else {
        media.focused = media.selected[indexSelected] || media.selected[indexSelected - 1] || '';
      }
    },
  },
});
