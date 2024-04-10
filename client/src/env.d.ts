/// <reference types="vite/client"/>

import type {AppLayouts, AppScreens} from 'index';
import type {AppThemes, AppBreakpoints} from 'styles';
import type {SvgProps} from 'react-native-svg';

declare module 'AppRouter' {
  export interface AppRoutes {
    Layout: typeof AppLayouts;
    Screen: typeof AppScreens;
  }
}

declare module 'styles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

declare module '*.svg' {
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}