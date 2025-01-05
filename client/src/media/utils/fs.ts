export async function observe(callback: (records: unknown[]) => void) {
  try {
    // @ts-expect-error FileSystemObserver is new
    const $ = new FileSystemObserver(async (records, observer) => {
      console.log('>> fs', records, observer);
      callback(records);
    });
    await $.observe(await navigator.storage.getDirectory());
    return $.disconnect as () => void;
  } catch (e) {
    return false;
  }
}
