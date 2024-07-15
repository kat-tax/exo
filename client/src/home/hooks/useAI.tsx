import {t} from '@lingui/macro';
import {generateText} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';
import {useState, useMemo, useCallback} from 'react';
import {useQuery, useEvolu, cast} from '@evolu/react-native';
import {useLingui} from '@lingui/react';
import {prompts, prompt} from 'app/data';
import {toast} from 'react-exo/toast';

const baseURL = 'https://api.groq.com/openai/v1';

import type {TextInput, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';

export function useAI(
  input: React.RefObject<TextInput>,
  model: string,
  apiKey: string,
) {
  const [index, setIndex] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const provider = useMemo(() => createOpenAI({baseURL, apiKey}), [apiKey]);
  const apiModel = useMemo(() => provider(model), [model, provider]);
  const {create} = useEvolu();
  const {rows} = useQuery(prompts);
  const {row} = useQuery(prompt(rows[Math.abs((rows.length - (index ?? 1)) % rows.length)]?.id));
  const {i18n} = useLingui();

  const promptText = useCallback(async (prompt: string, multi = false) => {
    setLoading(true);
    if (prompt.length > 0) {
      try {
        const {text} = await generateText({model: apiModel, prompt});
        create('AiPrompt', {
          model,
          prompt,
          response: text,
          isMultiLine: cast(multi),
        });
        setDirty(true);
      } catch (e) {
        toast({
          preset: 'error',
          title: t(i18n)`Groq Failure`,
          message: (e as Error).message,
        });
      }
    }
    setLoading(false);
  }, [apiModel, i18n, model, create]);

  const navigate = useCallback((
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    clearMulti?: () => void,
  ) => {
    const {key} = e.nativeEvent;
    const i = index ?? 0;

    if (key === 'ArrowDown') {
      if (clearMulti) return;
      if (i <= 1) return;
      setDirty(true);
      setIndex(i - 1);
      e.preventDefault();
    } else if (key === 'ArrowUp') {
      if (clearMulti) return;
      if (i >= rows.length) return;
      setDirty(true);
      setIndex(i + 1);
      e.preventDefault();
    } else if (key === 'Escape') {
      if (clearMulti) return clearMulti();
      setDirty(false);
      setIndex(null);
      e.preventDefault();
      input.current?.clear();
      input.current?.focus();
    } else {
      input.current?.focus();
      setDirty(false);
      setIndex(null);
    }
  }, [index, rows, input]);

  return {
    loading,
    promptText,
    dirty,
    navigate,
    response: row,
    archive: row && index !== null,
  };
}
