/// <reference types="vite/client"/>

import type {AppThemes, AppBreakpoints} from 'design/styles';
import type {SvgProps} from 'react-native-svg';

// Set Unistyles theme types
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

// Import assets
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

// Merge RNW extras with RN
import 'react-native';
declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean,
    focused?: boolean,
  }
  interface ViewStyle {
    transitionProperty?: string,
    transitionDuration?: string,
  }
  interface TextProps {
    accessibilityComponentType?: never,
    accessibilityTraits?: never,
    href?: string,
    hrefAttrs?: {
      rel: 'noreferrer',
      target?: '_blank',
    },
  }
  interface ViewProps {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    accessibilityRole?: string,
    href?: string,
    hrefAttrs?: {
      rel: 'noreferrer',
      target?: '_blank',
    },
  }
}
