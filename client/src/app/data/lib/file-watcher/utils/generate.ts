const THUMB_MAX_SIZE = 320;

export async function generateImageThumb(handle: FileSystemFileHandle): Promise<Uint8Array | null> {
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

export async function generateVideoThumb(handle: FileSystemFileHandle): Promise<Uint8Array | null> {
  try {
    const file = await handle.getFile();
    // Skip large files (limit to 500MB for video processing)
    if (file.size > 500 * 1024 * 1024) return null;
    // Dynamically import mediabunny to avoid bundling it if not needed
    const {Input, BlobSource, CanvasSink, ALL_FORMATS} = await import('mediabunny');
    // Create input from the file
    const source = new BlobSource(file);
    const input = new Input({source, formats: ALL_FORMATS});
    const videoTrack = await input.getPrimaryVideoTrack();
    if (!videoTrack) {
      console.warn('File has no video track');
      return null;
    }
    if (videoTrack.codec === null) {
      console.warn('Unsupported video codec');
      return null;
    }
    if (!(await videoTrack.canDecode())) {
      console.warn('Unable to decode the video track');
      return null;
    }
    // Compute width and height such that the larger dimension is equal to THUMB_MAX_SIZE
    const width = videoTrack.displayWidth > videoTrack.displayHeight
      ? THUMB_MAX_SIZE
      : Math.floor(THUMB_MAX_SIZE * videoTrack.displayWidth / videoTrack.displayHeight);
    const height = videoTrack.displayHeight > videoTrack.displayWidth
      ? THUMB_MAX_SIZE
      : Math.floor(THUMB_MAX_SIZE * videoTrack.displayHeight / videoTrack.displayWidth);
    // Get timestamp from the middle of the video
    const firstTimestamp = await videoTrack.getFirstTimestamp();
    const duration = await videoTrack.computeDuration();
    const middleTimestamp = firstTimestamp + duration / 2;
    // Create a CanvasSink for extracting a frame from the video track
    const sink = new CanvasSink(videoTrack, {width, height, fit: 'fill'});
    // Extract the frame at the middle timestamp
    let resultBlob: Blob | null = null;
    for await (const wrappedCanvas of sink.canvasesAtTimestamps([middleTimestamp])) {
      if (wrappedCanvas && wrappedCanvas.canvas instanceof OffscreenCanvas) {
        // Convert canvas to JPEG blob
        resultBlob = await wrappedCanvas.canvas.convertToBlob({type: 'image/jpeg', quality: 0.7});
        break;
      }
    }
    if (!resultBlob) {
      console.warn('Failed to extract video frame');
      return null;
    }
    // Convert to Uint8Array
    const arrayBuffer = await resultBlob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error generating video thumbnail:', error);
    return null;
  }
}
