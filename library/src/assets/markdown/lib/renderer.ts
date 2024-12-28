import {StyleSheet} from 'react-native';
import {getUniqueID} from './modules/utils';
import {textStyles, convertInlineStyles} from './modules/styles';

import type {ReactNode} from 'react';
import type {StyleProp, TextStyle, ViewStyle, ImageStyle} from 'react-native';
import type {ASTNode, RenderRules, RenderNodeFunction, RenderLinkFunction, RenderImageFunction} from './types';

export default class AstRenderer {
  constructor(
    private _renderRules: RenderRules,
    private _style: Record<string, StyleProp<TextStyle | ViewStyle | ImageStyle>>,
    private _onLinkPress: ((url: string) => boolean) | undefined,
    private _maxTopLevelChildren?: number,
    private _topLevelMaxExceededItem: ReactNode = null,
    private _allowedImageHandlers: string[] = [],
    private _defaultImageHandler = '',
    private _debugPrintTree = false,
  ) {}

  getRenderFunction = (type: keyof RenderRules): RenderNodeFunction | RenderLinkFunction | RenderImageFunction => {
    const renderFunction = this._renderRules[type as keyof RenderRules];
    if (!renderFunction) {
      console.warn(`Warning, unknown render rule encountered: ${type}.`);
      return this._renderRules.unknown;
    }
    return renderFunction;
  };

  renderNode = (node: ASTNode, parents: ASTNode[], isRoot = false) => {
    const renderFunction = this.getRenderFunction(node.type);
    const _parents = [...parents];

    // Debug the tree
    if (this._debugPrintTree === true) {
      let str = '';
      for (let a = 0; a < _parents.length; a++)
        str += '-';
      console.log(`${str}${node.type}`, node, parents);
    }

    _parents.unshift(node);

    // Calculate the children first
    let children: ReactNode[] = node.children.map((value) => {
      return this.renderNode(value, _parents);
    });

    // Render special types of nodes w/ different renderRule function signatures
    if (node.type === 'link' || node.type === 'blocklink') {
      return (renderFunction as RenderLinkFunction)(
        node,
        parents,
        children,
        this._style,
        this._onLinkPress,
      );
    }
    if (node.type === 'image') {
      return (renderFunction as RenderImageFunction)(
        node,
        parents,
        children,
        this._style,
        this._allowedImageHandlers,
        this._defaultImageHandler,
      );
    }

    // We are at the bottom of some tree - grab all the parent styles
    // this effectively grabs the styles from parents and
    // applies them in order of priority parent (least) to child (most)
    // to allow styling global, then lower down things individually.

    // We have to handle list_item seperately here because they have some child
    // pseudo classes that need the additional style props from parents passed down to them.
    if (children.length === 0 || node.type === 'list_item') {
      const styleObj = {};

      for (let a = parents.length - 1; a > -1; a--) {
        // Grab and additional attributes specified by markdown-it
        let refStyle = {};

        const attributes = parents[a]?.attributes;
        if (attributes?.style && typeof attributes.style === 'string') {
          refStyle = convertInlineStyles(attributes.style);
        }

        // Combine in specific styles for the object
        if (this._style[parents[a].type]) {
          refStyle = {
            ...refStyle,
            ...StyleSheet.flatten(this._style[parents[a].type]),
          };

          // Workaround for list_items and their content cascading down the tree
          if (parents[a].type === 'list_item') {
            let contentStyle: StyleProp<TextStyle | ViewStyle | ImageStyle> = {};
            if (parents[a + 1].type === 'bullet_list') {
              contentStyle = this._style.bullet_list_content;
            } else if (parents[a + 1].type === 'ordered_list') {
              contentStyle = this._style.ordered_list_content;
            }

            refStyle = {
              ...refStyle,
              ...StyleSheet.flatten(contentStyle),
            };
          }
        }

        // Then work out if any of them are text styles that should be used in the end.
        const arr = Object.keys(refStyle);
        for (let b = 0; b < arr.length; b++) {
          if (textStyles.includes(arr[b])) {
            styleObj[arr[b] as keyof typeof refStyle] = refStyle[arr[b] as keyof typeof refStyle];
          }
        }
      }

      return (renderFunction as RenderNodeFunction)(node, parents, children, this._style, styleObj);
    }

    // Cull top level children
    if (isRoot === true
      && this._maxTopLevelChildren
      && children.length > this._maxTopLevelChildren) {
      children = children.slice(0, this._maxTopLevelChildren);
      children.push(this._topLevelMaxExceededItem);
    }

    // Render anything else that has a normal signature
    return (renderFunction as RenderNodeFunction)(node, parents, children, this._style);
  };

  render = (nodes: ASTNode[]) => {
    return this.renderNode({
      type: 'body',
      key: getUniqueID(),
      children: nodes,
      index: 0,
      tokenIndex: 0,
      attributes: {},
      block: false,
      markup: '',
      content: '',
      sourceType: '',
      sourceInfo: '',
      sourceMeta: {},
    }, [], true);
  };
}
