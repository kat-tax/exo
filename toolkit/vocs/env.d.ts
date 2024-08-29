/// <reference types="vite/client"/>

import type {AppThemes, AppBreakpoints} from 'design/styles';
import type {SvgProps} from 'react-native-svg';

// Set Unistyles theme types
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
