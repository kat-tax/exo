import {forwardRef} from 'react';
import {ReadiumView, Settings, Appearance} from 'react-native-readium';

import type {BookComponent, BookProps, BookRef} from './Book.interface';

/** A component that renders an epub file */

export const Book: BookComponent = forwardRef(({url, theme, settings, ...props}: BookProps, ref: React.Ref<BookRef>) => {
  let bookSettings = new Settings();
  const appearance: Appearance = theme === 'default'
    ? Appearance.DEFAULT
    : theme === 'night'
      ? Appearance.NIGHT
      : Appearance.SEPIA;

  bookSettings.appearance = appearance;
  bookSettings = {...bookSettings, ...settings};
  
  return (
    <ReadiumView
      ref={ref}
      file={{url}}
      settings={bookSettings}
      {...props}
    />
  );
});
