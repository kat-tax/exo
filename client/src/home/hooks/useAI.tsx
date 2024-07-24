import {t} from '@lingui/macro';
import {toast} from 'react-exo/toast';
import {generateText} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';
import {useLingui} from '@lingui/react';
import {useEvolu, cast} from '@evolu/react-native';
import {useState, useMemo, useCallback} from 'react';
import {usePrompt, usePrompts} from 'app/data';

const baseURL = 'https://api.groq.com/openai/v1';

import type {TextInput, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';

export function useAI(
  input: React.RefObject<TextInput>,
  model: string,
  apiKey: string,
) {
  const {i18n} = useLingui();
  const {create} = useEvolu();
  const [index, setIndex] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const prompts = usePrompts();
  const prompt = usePrompt(prompts[Math.abs((prompts.length - (index ?? 1)) % prompts.length)]?.id);
  const groq = useMemo(() => createOpenAI({baseURL, apiKey}), [apiKey]);

  const promptText = useCallback(async (prompt: string, multi = false) => {
    setLoading(true);
    if (prompt.length > 0) {
      try {
        const {text} = await generateText({model: groq(model), prompt});
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
  }, [model, groq, create, i18n]);

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
      if (i >= prompts.length) return;
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
  }, [index, prompts, input]);

  return {
    loading,
    promptText,
    dirty,
    navigate,
    response: prompt,
    archive: prompt && index !== null,
  };
}
