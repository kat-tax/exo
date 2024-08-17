import type {ReadiumProps} from 'react-native-readium';

export type BookComponent = React.ForwardRefExoticComponent<BookProps>
export type BookProps = Omit<ReadiumProps, 'file'> & {
  url: string,
  theme?: 'default' | 'night' | 'sepia',
};

export interface BookRef {
  prevPage: () => void,
  nextPage: () => void,
};
