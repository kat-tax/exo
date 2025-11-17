export async function generateThumbnail(handle: FileSystemFileHandle): Promise<Uint8Array | null> {
  try {
    const file = await handle.getFile();
    // Skip large files
    if (file.size > 10 * 1024 * 1024) return null;
    // Create image bitmap
    const bitmap = await createImageBitmap(file, {
      resizeWidth: 200,
      resizeHeight: 200,
      resizeQuality: 'medium',
    });
    // Draw to canvas
    const canvas = new OffscreenCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, 200, 200);
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
