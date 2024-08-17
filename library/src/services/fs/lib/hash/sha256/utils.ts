export class IllegalStateError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'IllegalStateError';
  }
}

export function heapInit(
  heap?: Uint8Array,
  heapSize?: number,
): Uint8Array {
  const size = heap ? heap.byteLength : heapSize || 65536;
  if (size & 0xfff || size <= 0)
    throw new Error('heap size must be a positive integer and a multiple of 4096');
  return heap || new Uint8Array(new ArrayBuffer(size));
}

export function heapWrite(
  heap: Uint8Array,
  hpos: number,
  data: Uint8Array,
  dpos: number,
  dlen: number,
): number {
  const hlen = heap.length - hpos;
  const wlen = hlen < dlen ? hlen : dlen;
  heap.set(data.subarray(dpos, dpos + wlen), hpos);
  return wlen;
}
