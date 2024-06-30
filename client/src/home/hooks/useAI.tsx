import {generateText} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';
import {useState, useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-exo/toast';

import home from 'home/store';

const baseURL = 'https://api.groq.com/openai/v1';

import type {State} from 'app/store';
import type {TextInput, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';

export function useAI(
  apiKey: string,
  model: string,
  input: React.RefObject<TextInput>,
) {
  const [index, setIndex] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const provider = useMemo(() => createOpenAI({baseURL, apiKey}), [apiKey]);
  const response = useSelector((state: State) => home.selectors.getPrompt(state, index ?? 1));
  const history = useSelector(home.selectors.getPromptCount);

  const prompt = useCallback(async (prompt: string, multiLine?: boolean) => {
    setLoading(true);
    if (prompt.length > 0) {
      try {
        const {text} = await generateText({
          model: provider(model),
          prompt,
        });
        dispatch(home.actions.addPrompt([
          prompt,
          text,
          Date.now(),
          multiLine ?? false,
          model,
        ]));
        setDirty(true);
      } catch (e) {
        toast({
          title: 'Groq Failure',
          message: (e as Error).message,
          preset: 'error',
        });
      }
    }
    setLoading(false);
  }, [dispatch]);

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
      if (i >= history) return;
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
    }
  }, [index, history]);

  return {
    response,
    loading,
    prompt,
    dirty,
    navigate,
    archive: response && index !== null,
  };
}
