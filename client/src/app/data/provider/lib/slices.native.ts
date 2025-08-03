import type {Reducer} from 'react-exo/redux';
import type {ReducerKeys} from './slices.types';

const ctx = (require as any).context('../../../../../', false, /\/store\.ts$/);
const slices = {} as Record<ReducerKeys, Reducer<any>>;

ctx.keys().forEach((path: string) => {
  const match = path.match(/\.\/([^/]+)\/store\.ts$/);
  if (match) {
    const slice = ctx(path).default;
    slices[match[1] as ReducerKeys] = slice.reducer;
  }
});

export default slices;
