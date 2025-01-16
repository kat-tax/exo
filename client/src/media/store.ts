import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type MediaItem = {
  id: string;
  url: string;
  title: string;
  duration: number;
  type: 'audio' | 'video';
  thumbnail?: string;
}

export type Media = {
  selection: string[];
  playlist: MediaItem[];
  currentIndex: number;
  isPlaying: boolean;
  repeat: 'none' | 'all' | 'one';
  shuffle: boolean;
}

export default createSlice({
  name: 'media',
  initialState: <Media> {
    selection: [],
    playlist: [],
    currentIndex: -1,
    isPlaying: false,
    repeat: 'none',
    shuffle: false,
  },
  selectors: {
    getSelection: (media) => media.selection,
    getPlaylist: (media) => media.playlist,
    getCurrentItem: (media) => media.playlist[media.currentIndex],
    getIsPlaying: (media) => media.isPlaying,
    getShuffleMode: (media) => media.shuffle,
    getRepeatMode: (media) => media.repeat,
    getNextIndex: (media) => {
      if (media.currentIndex < media.playlist.length - 1) {
        return media.currentIndex + 1;
      }
      return media.repeat === 'all' ? 0 : -1;
    },
    getPreviousIndex: (media) => {
      if (media.currentIndex > 0) {
        return media.currentIndex - 1;
      }
      return media.repeat === 'all' ? media.playlist.length - 1 : -1;
    },
  },
  reducers: {
    setSelection(media, action: PayloadAction<string[]>) {
      media.selection = action.payload;
    },
    addToPlaylist(media, action: PayloadAction<MediaItem | MediaItem[]>) {
      const items = Array.isArray(action.payload) ? action.payload : [action.payload];
      media.playlist.push(...items);
    },
    addToPlayNext(media, action: PayloadAction<MediaItem | MediaItem[]>) {
      const items = Array.isArray(action.payload) ? action.payload : [action.payload];
      const insertIndex = media.currentIndex === -1 ? 0 : media.currentIndex + 1;
      media.playlist.splice(insertIndex, 0, ...items);
    },
    removeFromPlaylist(media, action: PayloadAction<string>) {
      const index = media.playlist.findIndex(item => item.id === action.payload);
      if (index > -1) {
        media.playlist.splice(index, 1);
        if (index < media.currentIndex) {
          media.currentIndex--;
        } else if (index === media.currentIndex) {
          media.isPlaying = false;
          if (media.playlist.length === 0) {
            media.currentIndex = -1;
          }
        }
      }
    },
    setCurrentIndex(media, action: PayloadAction<number>) {
      if (action.payload >= -1 && action.payload < media.playlist.length) {
        media.currentIndex = action.payload;
      }
    },
    playNext(media) {
      if (media.shuffle) {
        const remainingItems = media.playlist.length - (media.currentIndex + 1);
        if (remainingItems > 0) {
          const nextIndex = Math.floor(Math.random() * remainingItems) + media.currentIndex + 1;
          media.currentIndex = nextIndex;
        } else if (media.repeat === 'all') {
          media.currentIndex = 0;
        }
      } else {
        const nextIndex = media.currentIndex + 1;
        if (nextIndex < media.playlist.length) {
          media.currentIndex = nextIndex;
        } else if (media.repeat === 'all') {
          media.currentIndex = 0;
        }
      }
    },
    playPrevious(media) {
      if (media.currentIndex > 0) {
        media.currentIndex--;
      } else if (media.repeat === 'all') {
        media.currentIndex = media.playlist.length - 1;
      }
    },
    setIsPlaying(media, action: PayloadAction<boolean>) {
      media.isPlaying = action.payload;
    },
    setRepeatMode(media, action: PayloadAction<'none' | 'all' | 'one'>) {
      media.repeat = action.payload;
    },
    setShuffleMode(media, action: PayloadAction<boolean>) {
      media.shuffle = action.payload;
    },
    moveItem(media, action: PayloadAction<{fromIndex: number; toIndex: number}>) {
      const [item] = media.playlist.splice(action.payload.fromIndex, 1);
      media.playlist.splice(action.payload.toIndex, 0, item);
      // Update currentIndex if needed
      if (media.currentIndex === action.payload.fromIndex) {
        media.currentIndex = action.payload.toIndex;
      } else if (
        media.currentIndex > action.payload.fromIndex && 
        media.currentIndex <= action.payload.toIndex
      ) {
        media.currentIndex--;
      } else if (
        media.currentIndex < action.payload.fromIndex && 
        media.currentIndex >= action.payload.toIndex
      ) {
        media.currentIndex++;
      }
    },
    clearPlaylist(media) {
      media.playlist = [];
      media.currentIndex = -1;
      media.isPlaying = false;
    },
  },
});