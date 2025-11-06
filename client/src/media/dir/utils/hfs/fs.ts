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

export async function saveAs(dataUri?: string, name?: string) {
  if (!dataUri || !name) return;
  const a = document.createElement('a');
  a.download = name;
  a.href = dataUri;
  a.click();
  setTimeout(() => URL.revokeObjectURL(dataUri), 100);
}
