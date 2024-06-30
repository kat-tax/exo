import {createSlice} from 'react-exo/redux';

import type {PayloadAction} from 'react-exo/redux';

export type Home = {
  prompts: Array<Prompt>;
};

export type Prompt = [
  string,  // prompt
  string,  // response
  number,  // timestamp
  boolean, // multiline
  string,  // model
];

export default createSlice({
  name: 'home',
  initialState: <Home> {
    prompts: [],
  },
  selectors: {
    getPromptCount: (home) => home.prompts.length,
    getPrompt: (home, index: number) => {
      const length = home.prompts.length;
      const target = (length - index) % length;
      const prompt = home.prompts[Math.abs(target)];
      return prompt;
    },
  },
  reducers: {
    addPrompt(home, action: PayloadAction<Prompt>) {
      home.prompts.push(action.payload);
    },
    clearPrompts(home) {
      home.prompts = [];
    },
  },
});
