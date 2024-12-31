import ResponsiveImageView from 'react-native-responsive-image-view';
import {Pressable, View, Text, Image, Platform, StyleSheet} from 'react-native';
import {textStyles} from '../modules/styles';
import {hasParents} from '../modules/tokens';
import {openUrl} from '../modules/utils';

import type {ReactNode} from 'react';
import type {ASTNode, RenderRules} from '../types';

const view = (slug: string) => (
  node: ASTNode,
  _parents: ASTNode[],
  children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
) => {
  return (
    <View key={node.key} style={styles[`_${slug}` as keyof typeof styles]}>
      {children}
    </View>
  );
};

const text = (slug: string, literal?: string | null) => (
  node: ASTNode,
  _parents: ASTNode[],
  children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
  stylesInherited?: StyleSheet.NamedStyles<unknown>,
) => {
  return (
    <Text key={node.key} style={[stylesInherited, styles[slug as keyof typeof styles]]}>
      {typeof literal === 'string'
        ? literal
        : (literal === null
          ? node.content
          : children)
      }
    </Text>
  );
};

const code = (slug: string) => (
  node: ASTNode,
  _parents: ASTNode[],
  _children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
  stylesInherited?: StyleSheet.NamedStyles<unknown>,
) => {
  let _content = node.content;
  // Trim new line off the end of code blocks
  if (typeof node.content === 'string'
    && node.content.charAt(node.content.length - 1) === '\n') {
    _content = node.content.substring(0, node.content.length - 1);
  }
  return (
    <Text key={node.key} style={[stylesInherited, styles[slug as keyof typeof styles]]}>
      {_content}
    </Text>
  );
};

const link = (slug: string) => (
  node: ASTNode,
  _parents: ASTNode[],
  children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
  onLinkPress?: (url: string) => boolean,
) => {
  return (
    <Text
      key={node.key}
      style={styles[slug as keyof typeof styles]}
      onPress={() => openUrl(node.attributes.href as string, onLinkPress)}>
      {children}
    </Text>
  );
};

const image = (
  node: ASTNode,
  _parents: ASTNode[],
  _children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
  allowedImageHandlers: string[],
  defaultImageHandler: string,
) => {
  const {src, alt} = node.attributes;

  // Check that source starts w/ at least one element in allowedImageHandlers
  const show = allowedImageHandlers.filter((value) => {
    return src?.toLowerCase().startsWith(value.toLowerCase());
  }).length > 0;

  if (show === false && defaultImageHandler === null) {
    return null;
  }

  return (
    <ResponsiveImageView
      key={node.key}
      source={{uri: show === true ? src : `${defaultImageHandler}${src}`}}>
      {({getViewProps, getImageProps}) => (
        <View {...getViewProps()}>
          <Image
            // @ts-ignore
            style={styles._image}
            accessible={!!alt}
            accessibilityLabel={alt}
            {...getImageProps()}
          />
        </View>
      )}
    </ResponsiveImageView>
  )
};

const blocklink = (
  node: ASTNode,
  _parents: ASTNode[],
  children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
  onLinkPress?: (url: string) => boolean,
) => {
  return (
    <Pressable
      key={node.key}
      // @ts-ignore
      style={styles._blocklink}
      onPress={() => openUrl(node.attributes.href as string, onLinkPress)}>
      <View
        // @ts-ignore
        style={styles._image}>
        {children}
      </View>
    </Pressable>
  );
};

const list_item = (
  node: ASTNode,
  parents: ASTNode[],
  children: ReactNode,
  styles: StyleSheet.NamedStyles<unknown>,
  stylesInherited?: StyleSheet.NamedStyles<unknown>,
) => {
    // We need to grab any text specific stuff here that is applied on the list_item style
    // and apply it onto bullet_list_icon. the AST renderer has some workaround code to make
    // the content classes apply correctly to the child AST tree items as well
    // as code that forces the creation of the inheritedStyles object for list_items
    const refStyle = {
      ...stylesInherited,
      // @ts-ignore
      ...StyleSheet.flatten(styles._list_item),
    };

    const arr = Object.keys(refStyle);
    const _stylesInherited: StyleSheet.NamedStyles<unknown> = {};

    for (let b = 0; b < arr.length; b++) {
      if (textStyles.includes(arr[b])) {
        // @ts-ignore
        _stylesInherited[arr[b]] = refStyle[arr[b]];
      }
    }

    // @ts-ignore
    if (hasParents(parents, 'bullet_list')) {
      return (
        <View
          key={node.key}
          // @ts-ignore
          style={styles._list_item}>
          <Text
            // @ts-ignore
            style={[_stylesInherited, styles._bullet_list_icon]}
            accessible={false}>
            {Platform.select({
              default: '\u2022',
              android: '\u2022',
              ios: '\u00B7',
            })}
          </Text>
          <View
            // @ts-ignore
            style={styles._bullet_list_content}>
            {children}
          </View>
        </View>
      );
    }

    // @ts-ignore
    if (hasParents(parents, 'ordered_list')) {
      const orderedListIndex = parents.findIndex(
        (el) => el.type === 'ordered_list',
      );

      const orderedList = parents[orderedListIndex];
      const listItemNumber = orderedList?.attributes?.start
        ? orderedList.attributes.start + node.index
        : node.index + 1;

      return (
        <View
          key={node.key}
          // @ts-ignore
          style={styles._list_item}>
          <Text
            // @ts-ignore
            style={[_stylesInherited, styles._ordered_list_icon]}>
            {listItemNumber}
            {node.markup}
          </Text>
          <View
            // @ts-ignore
            style={styles._ordered_list_content}>
            {children}
          </View>
        </View>
      );
    }

    // We should not need this, but just in case
    return (
      <View
        key={node.key}
        // @ts-ignore
        style={styles._list_item}>
        {children}
      </View>
    );
};

const ignored = (
  _node: ASTNode,
  _parents: ASTNode[],
  _children: ReactNode,
  _styles: StyleSheet.NamedStyles<unknown>,
) => {
  return null;
};

export const renderRules = (): RenderRules => ({
  // The main container
  body: view('body'),
  // Headings
  heading1: view('heading1'),
  heading2: view('heading2'),
  heading3: view('heading3'),
  heading4: view('heading4'),
  heading5: view('heading5'),
  heading6: view('heading6'),
  // Horizontal Rule
  hr: view('hr'),
  // Emphasis
  strong: text('strong'),
  em: text('em'),
  s: text('s'),
  // Blockquotes
  blockquote: view('blockquote'),
  // Lists
  bullet_list: view('bullet_list'),
  ordered_list: view('ordered_list'),
  list_item,
  // Code
  code_inline: text('code_inline', null),
  code_block: code('code_block'),
  fence: code('fence'),
  // Tables
  table: view('table'),
  thead: view('thead'),
  tbody: view('tbody'),
  th: view('th'),
  tr: view('tr'),
  td: view('td'),
  // Links
  link: link('link'),
  blocklink,
  // Images
  image,
  // Text Output
  text: text('text', null),
  textgroup: text('textgroup'),
  paragraph: view('paragraph'),
  hardbreak: text('hardbreak', '\n'),
  softbreak: text('softbreak', '\n'),
  pre: view('pre'),
  inline: text('inline'),
  span: text('span'),
  // Unknown elements are ignored
  unknown: ignored,
});

export default renderRules;
