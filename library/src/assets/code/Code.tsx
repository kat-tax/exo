import {createHighlighter} from 'shiki';
import {createOnigurumaEngine} from 'shiki/engine-oniguruma.mjs';
import {useEffect, useState, useRef} from 'react';

// TODO: Native Shiki Engine
// Engine: https://github.com/skiniks/react-native-shiki-engine?tab=readme-ov-file#example-implementation
// Display: https://github.com/skiniks/react-native-shiki-engine/blob/main/example/src/components/TokenDisplay.tsx

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
      setCode(shiki.current.codeToHtml(children, {lang, theme}));
    })();
  }, [children, lang, theme]);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: temporary
      dangerouslySetInnerHTML={{__html: code}}
    />
  );
}
