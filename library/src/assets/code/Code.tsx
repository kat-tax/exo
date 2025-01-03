import {createHighlighter} from 'shiki';
import {createOnigurumaEngine} from 'shiki/engine-oniguruma.mjs';
import {useEffect, useState, useRef} from 'react';

import type {CodeProps} from './Code.interface';

const highlighterInit = createHighlighter({
  engine: createOnigurumaEngine(import('shiki/wasm')),
  themes: ['dark-plus', 'light-plus'],
  langs: ['typescript', 'tsx'],
});

export function Code(props: CodeProps) {
  const {lang, theme, children} = props;
  const [code, setCode] = useState('');
  const shiki = useRef<Awaited<typeof highlighterInit>>();

  useEffect(() => {
    (async () => {
      shiki.current = await highlighterInit;
      lang && await shiki.current.loadLanguage(lang);
      setCode(shiki.current.codeToHtml(children, {
        lang: lang ?? 'text',
        theme: theme ?? 'light-plus',
      }));
    })();
  }, [children, lang, theme]);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: temporary
      dangerouslySetInnerHTML={{__html: code}}
    />
  );
}
