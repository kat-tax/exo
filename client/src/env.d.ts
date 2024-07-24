/// <reference types="vite/client"/>
/// <reference types="design/types"/>

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
