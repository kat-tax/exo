import {generateText} from 'ai';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useCallback} from 'react';
import {createOpenAI} from '@ai-sdk/openai';
import home from 'home/store';

import type {State} from 'app/store';
import type {TextInput, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';

const BASE_URL = 'https://api.groq.com/openai/v1';
const API_KEY = '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';
const groq = createOpenAI({baseURL: BASE_URL, apiKey: API_KEY});

export function useAI(ref: React.RefObject<TextInput>) {
  const [index, setIndex] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const promptCount = useSelector((state: State) =>
    home.selectors.getPromptCount(state));

  const response = useSelector((state: State) =>
    home.selectors.getPrompt(state, index ?? 1));

  const prompt = useCallback(async (prompt: string) => {
    setDirty(true);
    setLoading(true);
    if (prompt.length > 0 && prompt.length < 5000) {
      const {text} = await generateText({
        model: groq('llama3-8b-8192'),
        prompt,
      });
      dispatch(home.actions.addPrompt([
        prompt,
        text,
        Date.now(),
      ]));
    }
    setLoading(false);
  }, [dispatch]);

  const history = useCallback((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const {key} = e.nativeEvent;
    const i = index ?? 1;
    if (key === 'ArrowDown') {
      if (i <= 1) return;
      setDirty(true);
      setIndex(i - 1);
      e.preventDefault();
    } else if (key === 'ArrowUp') {
      if (i >= promptCount) return;
      setDirty(true);
      setIndex(i + 1);
      e.preventDefault();
    } else if (key === 'Escape') {
      setDirty(false);
      setIndex(null);
      e.preventDefault();
      ref.current?.clear();
      ref.current?.focus();
    }
  }, [index, promptCount]);

  return {
    response,
    loading,
    prompt,
    dirty,
    history,
    archive: response && index !== null,
  };
}
