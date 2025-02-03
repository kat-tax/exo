type CmdFn<EntryType, Fn> = Fn extends (entry: EntryType, ...args: infer Rest) => infer Return
  ? (...args: Rest) => Return
  : Fn;

export function bind<EntryType, CmdType extends Record<string, any>>(
  cmd: CmdType,
  entry: EntryType
): {
  [K in keyof CmdType]: CmdFn<EntryType, CmdType[K]>
} {
  return Object.fromEntries(
    Object.entries(cmd).map(([key, fn]) => [key, (fn as Function).bind(null, entry)])
  ) as {
    [K in keyof CmdType]: CmdFn<EntryType, CmdType[K]>
  };
}
