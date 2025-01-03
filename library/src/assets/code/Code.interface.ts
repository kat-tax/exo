import type {BundledTheme as CodeThemes} from 'shiki';
import type {BundledLanguage as CodeLanguages} from 'shiki';

export type {CodeThemes, CodeLanguages};

export interface CodeProps {
  lang?: CodeLanguages,
  theme?: CodeThemes,
  children: string,
};
