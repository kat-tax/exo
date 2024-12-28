import * as tokens from './modules/tokens';

import type MarkdownIt from 'markdown-it';
import type {ReactNode} from 'react';
import type {ASTNode} from './types';

export default function parser(
  source: string | ASTNode[],
  parser: MarkdownIt,
  renderer: (node: ASTNode[]) => ReactNode,
): ReactNode {
  if (Array.isArray(source))
    return renderer(source);
  let t = tokens.stringToTokens(source, parser);
  t = tokens.cleanup(t);
  t = tokens.groupText(t);
  t = tokens.omitListItemParagraph(t);
  return renderer(tokens.toAST(t));
}
