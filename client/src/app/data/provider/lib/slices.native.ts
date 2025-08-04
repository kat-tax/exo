import type {Reducer} from 'react-exo/redux';
import type {ReducerKeys} from './slices.types';

const ctx = (require as any).context('../../../../../', true, /\/store\.ts$/);
const slices = {} as Record<ReducerKeys, Reducer<any>>;

ctx.keys().forEach((path: string) => {
  const match = path.match(/\.\/src\/([^/]+)\/store\.ts$/);
  if (match) {
    slices[match[1] as ReducerKeys] = ctx(path).default.reducer;
  }
});

export default slices;
