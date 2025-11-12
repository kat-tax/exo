import {setupCamera, stopStream, generateTimestampFilename} from './utils';

export async function captureVideo(
  onStart: () => Promise<void>,
  onStop: () => Promise<void>,
): Promise<File> {
  // Set up camera immediately for preview
  const {stream} = await setupCamera('environment');

  try {
    // Wait for onStart callback to trigger recording
    await onStart();

    // Create MediaRecorder to record video
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : 'video/mp4';

    const recorder = new MediaRecorder(stream, {mimeType});

    // Collect video chunks
    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    // Start recording
    recorder.start();

    // Wait for callback to signal stop
    await onStop();

    // Stop recording
    recorder.stop();

    // Wait for recording to finish and get the blob
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    // Stop camera stream
    stopStream(stream);

    // Create blob from chunks
    const blob = new Blob(chunks, {type: mimeType});

    // Determine file extension based on mime type
    const extension = mimeType.includes('webm') ? 'webm' : 'mp4';

    // Create File object with timestamp name
    const file = new File([blob], generateTimestampFilename('camera', extension), {
      type: mimeType,
    });

    return file;
  } catch (error) {
    // Ensure stream is stopped even if there's an error
    stopStream(stream);
    throw error;
  }
}

