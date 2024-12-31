import MarkdownIt from 'markdown-it';
import {useMemo, memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {removeTextStyleProps} from './lib/modules/styles';

import styles from './lib/styles';
import parser from './lib/parser';
import renderRules from './lib/rules';
import AstRenderer from './lib/renderer';

import type {ReactNode} from 'react';
import type {RenderRules} from './lib/types';

export interface MarkdownProps {
  children: string;
  rules?: Partial<RenderRules>;
  style?: StyleSheet.NamedStyles<unknown>;
  renderer?: AstRenderer;
  markdownit?: MarkdownIt;
  mergeStyle?: boolean;
  debugPrintTree?: boolean;
  maxTopLevelChildren?: number;
  topLevelMaxExceededItem?: ReactNode;
  defaultImageHandler?: string;
  allowedImageHandlers?: string[];
  onLinkPress?: (url: string) => boolean;
}

export const Markdown = memo((props: MarkdownProps) => {
  const rules = props.rules ?? null;
  const style = props.style ?? null;
  const children = props.children ?? '';
  const renderer = props.renderer ?? null;
  const markdownit = props.markdownit ?? MarkdownIt({typographer: true});
  const mergeStyle = props.mergeStyle ?? true;
  const onLinkPress = props.onLinkPress;
  const debugPrintTree = props.debugPrintTree ?? false;
  const maxTopLevelChildren = props.maxTopLevelChildren ?? undefined;
  const topLevelMaxExceededItem = props.topLevelMaxExceededItem ?? <Text key="ellipsis">...</Text>;
  const defaultImageHandler = props.defaultImageHandler ?? 'https://';
  const allowedImageHandlers = props.allowedImageHandlers ?? [
    'data:image/png;base64',
    'data:image/gif;base64',
    'data:image/jpeg;base64',
    'https://',
    'http://',
  ];

  const memoParser = useMemo(() => markdownit, [markdownit]);
  const memoRender = useMemo(
    () => getRenderer(renderer, rules, style, mergeStyle, onLinkPress, maxTopLevelChildren, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler, debugPrintTree),
    [renderer, rules, style, mergeStyle, onLinkPress, maxTopLevelChildren, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler, debugPrintTree],
  );

  return parser(
    children,
    memoParser,
    memoRender.render,
  );
});

function getRenderer(
  renderer: AstRenderer | null,
  rules: Partial<RenderRules> | null,
  style: StyleSheet.NamedStyles<unknown> | null,
  mergeStyle: boolean,
  onLinkPress: ((url: string) => boolean) | undefined,
  maxTopLevelChildren: number | undefined,
  topLevelMaxExceededItem: ReactNode,
  allowedImageHandlers: string[],
  defaultImageHandler: string,
  debugPrintTree: boolean,
): AstRenderer {
  // Validate props
  if (renderer && rules)
    console.warn('You are using renderer and rules at the same time. This is not possible, props.rules is ignored.');
  if (renderer && style)
    console.warn('You are using renderer and style at the same time. This is not possible, props.style is ignored.');
  
  // Use provided renderer
  if (renderer) {
    return renderer;
  }

  // Create renderer
  return new AstRenderer(
    {...renderRules(), ...(rules || {})},
    getStyle(mergeStyle, style),
    onLinkPress,
    maxTopLevelChildren,
    topLevelMaxExceededItem,
    allowedImageHandlers,
    defaultImageHandler,
    debugPrintTree,
  );
}

function getStyle(mergeStyle: boolean, style: StyleSheet.NamedStyles<unknown> | null) {
  let useStyles: StyleSheet.NamedStyles<unknown> = {};
  if (mergeStyle === true && style !== null) {
    // Make sure we get anything user defined
    for (const value of Object.keys(style)) {
      // @ts-ignore
      useStyles[value] = {
        // @ts-ignore
        ...StyleSheet.flatten(style[value]),
      };
    }
    // Combine any existing styles
    for (const value of Object.keys(styles)) {
      // @ts-ignore
      useStyles[value] = {
        // @ts-ignore
        ...styles[value],
        // @ts-ignore
        ...StyleSheet.flatten(style[value]),
      };
    }
  } else {
    useStyles = {...styles};
    if (style !== null) {
      for (const value of Object.keys(style)) {
        // @ts-ignore
        useStyles[value] = {
          // @ts-ignore
          ...StyleSheet.flatten(style[value]),
        };
      }
    }
  }

  for (const value of Object.keys(useStyles)) {
    // @ts-ignore
    useStyles[`_${value}`] = removeTextStyleProps(useStyles[value]);
  }

  return StyleSheet.create(useStyles);
}

export default Markdown;
