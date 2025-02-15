type CmdFn<T, F> = F extends (e: T, ...a: infer A) => infer Return ? (...a: A) => Return : F;

export const bind = <E, C extends Record<string, (e: E, ...a: never[]) => unknown>>(c: C, e: E): {[K in keyof C]: CmdFn<E, C[K]>} =>
  Object.fromEntries(Object.entries(c).map(([k, f]) => [k, f.bind(null, e)])) as {[K in keyof C]: CmdFn<E, C[K]>};

export function tag<T, C extends Record<string, unknown>>(name: string) {
  const $ = Symbol(name);
  return {
    type: $ as unknown as symbol,
    get: (entry: T, cmd: C) => ({[$]: true, entry, cmd}) satisfies {[$]: true, entry: T, cmd: C},
    is: (data: Record<string | symbol, unknown>): data is {[$]: true, entry: T, cmd: C} => data[$] === true,
  };
}
