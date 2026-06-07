export const MIN_FILE_SIZE = 1024 * 100; // 100KB
export const HEADER_FOOTER_SIZE = 1024 * 8; // 8KB
export const SAMPLE_COUNT = 4;
export const SAMPLE_SIZE = 1024 * 10; // 10KB

export async function getFileHash(file: FileSystemFileHandle): Promise<string> {
  const sync = await file.createSyncAccessHandle();
  const size = sync.getSize();
  return size <= MIN_FILE_SIZE
    ? getFileHashFull(sync, size)
    : getFileHashSample(sync, size);
}

export async function getFileHashFull(sync: FileSystemSyncAccessHandle, size: number): Promise<string> {
  const contents = new Uint8Array(size);
  sync.read(contents);
  const digest = await crypto.subtle.digest('SHA-256', contents);
  const hex = uint8ArrayToHex(new Uint8Array(digest));
  sync.close();
  return hex;
}

export async function getFileHashSample(sync: FileSystemSyncAccessHandle, size: number): Promise<string> {
  const chunks: Uint8Array[] = [];

  // Add size as little-endian bytes (8 bytes for u64)
  const sizeBuffer = new ArrayBuffer(8);
  const sizeView = new DataView(sizeBuffer);
  sizeView.setBigUint64(0, BigInt(size), true); // true = little-endian
  chunks.push(new Uint8Array(sizeBuffer));

  // Header (8KB from start)
  const header = new Uint8Array(HEADER_FOOTER_SIZE);
  sync.read(header, {at: 0});
  chunks.push(header);

  // 4 samples (10KB each) evenly spaced through the middle
  const seekJump = Math.floor((size - HEADER_FOOTER_SIZE * 2) / SAMPLE_COUNT);
  let currentPos = HEADER_FOOTER_SIZE;

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const sample = new Uint8Array(SAMPLE_SIZE);
    sync.read(sample, {at: currentPos});
    chunks.push(sample);
    currentPos += seekJump;
  }

  // Footer (8KB from end)
  const footerStart = size - HEADER_FOOTER_SIZE;
  const footer = new Uint8Array(HEADER_FOOTER_SIZE);
  sync.read(footer, {at: footerStart});
  chunks.push(footer);

  // Concatenate all chunks
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  // Hash and return first 16 characters
  const digest = await crypto.subtle.digest('SHA-256', combined);
  const hex = uint8ArrayToHex(new Uint8Array(digest));
  sync.close();
  return hex;
}

function uint8ArrayToHex(data: Uint8Array): string {
  return Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
