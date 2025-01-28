export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  options: { immediate?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;
  let result: ReturnType<T>;
  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = undefined;
      if (!options.immediate) {
        result = fn.apply(this, args);
      }
    };

    const callNow = options.immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = fn.apply(this, args);
    }
  };
}