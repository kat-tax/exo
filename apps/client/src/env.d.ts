/// <reference types="vite/client"/>

import type {SvgProps} from 'react-native-svg';
import type {AppThemes, AppBreakpoints} from 'styles';

declare module 'react-native-unistyles' {
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
