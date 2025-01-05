export async function observe(path: string, callback: (records: unknown[]) => void) {
  try {
    // @ts-expect-error FileSystemObserver is new
    const $ = new FileSystemObserver(async (records, observer) => {
      console.log('>> fs', records, observer);
      callback(records);
    });
    const root = await navigator.storage.getDirectory();
    const dir = !!path && await root.getDirectoryHandle(path);
    await $.observe(dir || root, {recursive: false});
    return $.disconnect as () => void;
  } catch (e) {
   console.error('>> fs [error]', e);
   return false;
  }
}

export async function poll(path: string, delta: number) {
  try {
    const meta = await metadata(path, false);
    // @ts-expect-error
    const date = new Date(meta?.modificationTime);
    return date.getTime() > delta;
  } catch (e) {
    return true;
  }
}

export async function metadata(path: string, isFile: boolean) {
  const root = await new Promise((res, rej) => {
    try {
      // @ts-expect-error
      webkitRequestFileSystem(0, 0, x => res(x.root), () => res())
    } catch (err) {rej(err)}
  });

  const dir = () => new Promise((res, rej) => {
    // @ts-expect-error
    root.getDirectory(path, {}, h => h.getMetadata(res, rej), rej)
  });
  
  const file = () => new Promise((res, rej) => {
    // @ts-expect-error
    root.getFile(path, {}, h => h.getMetadata(res, rej), rej)
  });

  return isFile ? file() : dir();
}
