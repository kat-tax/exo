import type {locales} from 'cfg/lingui.config';

export type Locales =  typeof locales[number];
export type Messages = Record<Locales, {
  messages: Record<string, string>
}>;
