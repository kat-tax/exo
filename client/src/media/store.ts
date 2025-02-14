import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Media = {
  layout: 'list' | 'grid',
  focused: string,
  selected: string[],
  dragging: string[],
  renaming: string[],
  copying: string[],
  moving: string[],
  lists: {
    main: string[],
    temp: string[],
  },
}

export default createSlice({
  name: 'media',
  initialState: <Media> {
    layout: 'list',
    focused: '',
    selected: [],
    dragging: [],
    renaming: [],
    copying: [],
    moving: [],
    lists: {
      main: [],
      temp: [],
    },
  },
  selectors: {
    getLayout: (media) => media.layout,
    getFocused: (media) => media.focused,
    getSelected: (media) => media.selected,
    getDragging: (media) => media.dragging,
    getRenaming: (media) => media.renaming,
    getCopying: (media) => media.copying,
    getMoving: (media) => media.moving,
  },
  reducers: {
    layout(media, action: PayloadAction<'list' | 'grid'>) {
      media.layout = action.payload;
    },
    list(media, action: PayloadAction<{list: 'main' | 'temp', items: string[]}>) {
      const {list, items} = action.payload;
      media.lists[list] = items;
    },
    focus(media, action: PayloadAction<string>) {
      media.focused = action.payload;
    },
    drag(media, action: PayloadAction<string | null>) {
      if (!action.payload) {
        media.dragging = [];
      } else if (!media.selected.includes(action.payload)) {
        media.dragging = [action.payload];
      } else {
        media.dragging = media.selected;
      }
    },
    selectBulk(media, action: PayloadAction<string[] | 'main' | 'temp'>) {
      media.selected = Array.isArray(action.payload)
        ? action.payload
        : media.lists[action.payload];
      // Refocus after selection changes
      if (media.selected.length === 0) {
        media.focused = '';
      } else {
        media.focused = media.selected[0];
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
      namespace?: 'main' | 'temp',
    }>) {
      const {path, isMulti, isRange, namespace = 'main'} = action.payload;
      const indexSelected = media.selected.indexOf(path);
      // Range select (shift+click)
      if (isRange) {
        const _ = media.lists[namespace];
        const to = _.indexOf(path);
        const from = _.indexOf(media.focused);
        const range = _.slice(Math.min(from, to), Math.max(from, to) + 1);
        media.selected = [...new Set([...media.selected, ...range])];
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
