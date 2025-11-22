const THUMB_MAX_SIZE = 320;

export async function generateThumbnail(handle: FileSystemFileHandle): Promise<Uint8Array | null> {
  try {
    const file = await handle.getFile();
    // Skip large files
    if (file.size > 10 * 1024 * 1024) return null;
    // Create image bitmap
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(THUMB_MAX_SIZE / bitmap.width, THUMB_MAX_SIZE / bitmap.height);
    const width = Math.floor(bitmap.width * scale);
    const height = Math.floor(bitmap.height * scale);
    // Draw to canvas
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    // Convert to blob
    const blob = await canvas.convertToBlob({
      type: 'image/jpeg',
      quality: 0.7,
    });
    // Convert to Uint8Array
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return null;
  }
}
