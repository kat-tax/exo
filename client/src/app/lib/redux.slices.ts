import type {Reducer} from 'react-exo/redux';
import type {ReducerKeys} from './redux.types';

const ctx = (import.meta as any).glob('./**/store.ts', {
  base: '/',
  eager: true,
  import: 'default',
}) as Record<string, {reducer: Reducer<any>}>;

export default Object.entries(ctx).reduce((acc, [path, slice]) => {
  const match = path.match(/\.\/src\/([^/]+)\/store\.ts$/);
  if (match) acc[match[1] as ReducerKeys] = slice.reducer;
  return acc;
}, {} as Record<ReducerKeys, Reducer<any>>);
