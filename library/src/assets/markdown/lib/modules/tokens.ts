import Token from 'markdown-it/lib/token';
import {getUniqueID} from './utils';

import type MarkdownIt from 'markdown-it';
import type {ASTNode, RenderRules} from '../types';

const regexOpenClose = /_open|_close/g;

function ast(token: Token, tokenIndex: number): ASTNode {
  const type = getType(token);
  const key = `${getUniqueID()}_${type}`;
  const attributes: Record<string, unknown> = {};
  if (token.attrs) {
    for (const [name, value] of token.attrs) {
      attributes[name] = value;
    }
  }
  return {
    key,
    type,
    index: 0,
    tokenIndex,
    attributes,
    children: toAST(token.children || []),
    block: token.block,
    markup: token.markup,
    content: token.content,
    sourceType: token.type,
    sourceInfo: token.info || '',
    sourceMeta: token.meta,
  };
}

export function toAST(tokens: ReadonlyArray<Token>): ASTNode[] {
  const stack: ASTNode[][] = [];
  let children: ASTNode[] = [];
  if (!tokens || tokens.length === 0)
    return [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const astNode = ast(token, i);
    if (!(astNode.type === 'text'
      && astNode.children.length === 0
      && astNode.content === '')) {
      astNode.index = children.length;
      if (token.nesting === 1) {
        children.push(astNode);
        stack.push(children);
        children = astNode.children;
      } else if (token.nesting === -1) {
        children = stack.pop() || [];
      } else if (token.nesting === 0) {
        children.push(astNode);
      }
    }
  }
  return children;
}

export function cleanup(tokens: Token[]): Token[] {
  const _tokens = flatten(tokens);
  for (const token of _tokens) {
    token.type = getType(token);
    // Set image and hardbreak to block elements
    if (token.type === 'image' || token.type === 'hardbreak') {
      token.block = true;
    }
    // Set img alt text
    if (token.type === 'image' && token.attrs) {
      token.attrs[token.attrIndex('alt')][1] = renderInlineAsText(
        token.children ?? [],
      );
    }
  }

  // Change link token to a blocklink to fix issue where link tokens with
  const stack: Token[] = [];
  return _tokens.reduce((acc: Token[], token: Token) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (
      stack.length > 0 &&
      token.type === 'link' &&
      token.nesting === -1
    ) {
      if (stack.some((stackToken) => stackToken.block)) {
        stack[0].type = 'blocklink';
        stack[0].block = true;
        token.type = 'blocklink';
        token.block = true;
      }
      stack.push(token);
      while (stack.length) {
        const token = stack.shift();
        if (token) acc.push(token);
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }
    return acc;
  }, []);
}

export function flatten(tokens: Token[]): Token[] {
  return tokens.reduce((acc: Token[], curr: Token) => {
    if (curr.type === 'inline' && curr.children && curr.children?.length > 0) {
      const children = flatten(curr.children);
      while (children.length) {
        const child = children.shift();
        if (child) acc.push(child);
      }
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
}

export function getType(token: Token): keyof RenderRules {
  let _token = 'unknown';
  if (token.type)
    _token = token.type.replace(regexOpenClose, '');
  switch (_token) {
    case 'heading':
      _token = `${_token}${token.tag.slice(1)}`;
      break;
    default:
      break;
  }

  return _token as keyof RenderRules;
}

export function groupText(tokens: Token[]): Token[] {
  const result: Token[] = [];
  let hasGroup = false;
  for (const token of tokens) {
    if (!token.block && !hasGroup) {
      hasGroup = true;
      result.push(new Token('textgroup', 'p', 1));
      result.push(token);
    } else if (!token.block && hasGroup) {
      result.push(token);
    } else if (token.block && hasGroup) {
      hasGroup = false;
      result.push(new Token('textgroup', 'p', -1));
      result.push(token);
    } else {
      result.push(token);
    }
  }
  return result;
}

export function hasParents(parents: Token[], type: string): boolean {
  return parents.findIndex((el) => el.type === type) > -1;
}

export function stringToTokens(source: string, markdownIt: MarkdownIt): Token[] {
  let result: Token[] = [];
  try {
    result = markdownIt.parse(source, {});
  } catch (err) {
    console.warn(err);
  }
  return result;
}

export function renderInlineAsText(tokens: Token[]): string {
  let result = '';
  for (let i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += renderInlineAsText(tokens[i].children ?? []);
    }
  }
  return result;
}

export function omitListItemParagraph(tokens: Token[]): Token[] {
  // Used to ensure that we remove the correct ending paragraph token
  let depth: number | null = null;
  return tokens.filter((token, index) => {
    // Update depth if we've already removed a starting paragraph token
    if (depth !== null) {
      depth = depth + token.nesting;
    }
    // Check for a list_item token followed by paragraph token (to remove)
    if (token.type === 'list_item' && token.nesting === 1 && depth === null) {
      const next = index + 1 in tokens ? tokens[index + 1] : null;
      if (next && next.type === 'paragraph' && next.nesting === 1) {
        depth = 0;
        return true;
      }
    } else if (token.type === 'paragraph') {
      // Remove the paragraph token immediately after the list_item token
      if (token.nesting === 1 && depth === 1) {
        return false;
      }
      // Remove the ending paragraph token; reset depth
      if (token.nesting === -1 && depth === 0) {
        depth = null;
        return false;
      }
    }
    return true;
  });
}

export function splitTextNonTextNodes(children: Token[]): {textNodes: Token[]; nonTextNodes: Token[]} {
  return children.reduce(
    (acc: {textNodes: Token[]; nonTextNodes: Token[]}, curr: Token) => {
      if (curr.type === 'Text') {
        acc.textNodes.push(curr);
      } else {
        acc.nonTextNodes.push(curr);
      }
      return acc;
    },
    {textNodes: [], nonTextNodes: []},
  );
}
