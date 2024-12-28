import {createHighlighterCore} from '@shikijs/core';
import {createOnigurumaEngine} from '@shikijs/engine-oniguruma';
import {useEffect, useRef, useMemo} from 'react';
import {View, Text} from 'react-native';

import type {CodeProps} from './Code.interface';

const highlighterInit = createHighlighterCore({
  themes: ['nord'],
  langs: ['typescript'],
  engine: createOnigurumaEngine(import('shiki/wasm')),
});

export function Code(props: CodeProps) {
  const {lang, theme, children} = props;
  const highlighter = useRef<Awaited<typeof highlighterInit>>();

  useEffect(() => {
    const initHighlighter = async () => {
      highlighter.current = await highlighterInit;
      console.log(highlighter.current);
    };
    initHighlighter();
  }, []);

  const code = useMemo(() => {
    if (!highlighter.current) return '';
    const html = highlighter.current.codeToHtml(children, {lang, theme});
    console.log(html);
    return html;
  }, [children, lang, theme]);

  return (
    <View>
      <Text>{code}</Text>
    </View>
  );
}
