import type {RecordVideoOptions, VideoFile} from 'react-native-vision-camera';
import {CameraCaptureError} from 'react-native-vision-camera';

export interface VideoRecorderState {
  recorder: MediaRecorder | null;
  isRecording: boolean;
  isPaused: boolean;
  onRecordingFinished: ((video: VideoFile) => void) | null;
  onRecordingError: ((error: CameraCaptureError) => void) | null;
}

/**
 * Start recording video from a media stream
 */
export function startVideoRecording(
  stream: MediaStream,
  options: RecordVideoOptions,
  state: VideoRecorderState,
): void {
  if (state.isRecording) {
    throw new CameraCaptureError('capture/recording-in-progress', 'A recording is already in progress');
  }

  if (!stream || stream.getVideoTracks().length === 0) {
    throw new CameraCaptureError('capture/video-not-enabled', 'No video track available in stream');
  }

  try {
    // Determine MIME type based on fileType
    const mimeType = options.fileType === 'mp4' ? 'video/mp4' : 'video/webm';

    // Check if codec is supported, fallback to default
    let codecOptions: MediaRecorderOptions = {};
    if (options.videoCodec === 'h265') {
      // Try H.265/HEVC, but fallback if not supported
      if (MediaRecorder.isTypeSupported('video/mp4; codecs=hev1')) {
        codecOptions = {mimeType: 'video/mp4; codecs=hev1'};
      } else if (MediaRecorder.isTypeSupported('video/mp4; codecs=hvc1')) {
        codecOptions = {mimeType: 'video/mp4; codecs=hvc1'};
      }
    }

    // Use the best supported MIME type
    const supportedMimeType = codecOptions.mimeType || (MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm');

    const recorder = new MediaRecorder(stream, {
      ...codecOptions,
      mimeType: supportedMimeType,
    });

    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onerror = (_event) => {
      const error = new CameraCaptureError(
        'capture/recorder-error',
        'An error occurred while recording video',
      );
      state.onRecordingError?.(error);
      resetRecorderState(state);
    };

    recorder.onstop = async () => {
      try {
        if (chunks.length === 0) {
          const error = new CameraCaptureError('capture/no-data', 'No video data was recorded');
          state.onRecordingError?.(error);
          resetRecorderState(state);
          return;
        }

        // Create blob from chunks
        const blob = new Blob(chunks, {type: supportedMimeType});
        const url = URL.createObjectURL(blob);
        const path = url;

        // Get video dimensions from stream
        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        const width = settings.width ?? 1280;
        const height = settings.height ?? 720;

        // Create a video element to get duration
        const video = document.createElement('video');
        video.src = url;
        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject(new Error('Failed to load video metadata'));
        });
        const duration = video.duration || 0;

        const videoFile: VideoFile = {
          path,
          duration,
          width,
          height,
        };

        state.onRecordingFinished?.(videoFile);
        resetRecorderState(state);
      } catch (error) {
        const captureError = new CameraCaptureError(
          'capture/file-io-error',
          error instanceof Error ? error.message : 'Failed to process recorded video',
        );
        state.onRecordingError?.(captureError);
        resetRecorderState(state);
      }
    };

    // Start recording
    recorder.start(100); // Collect data every 100ms
    state.recorder = recorder;
    state.isRecording = true;
    state.isPaused = false;
    state.onRecordingFinished = options.onRecordingFinished;
    state.onRecordingError = options.onRecordingError;
  } catch (error) {
    const captureError = new CameraCaptureError(
      'capture/create-recorder-error',
      error instanceof Error ? error.message : 'Failed to create video recorder',
    );
    state.onRecordingError?.(captureError);
    throw captureError;
  }
}

/**
 * Pause video recording
 */
export function pauseVideoRecording(state: VideoRecorderState): void {
  if (!state.isRecording) {
    throw new CameraCaptureError('capture/no-recording-in-progress', 'No recording is in progress');
  }

  if (!state.recorder || state.isPaused) {
    return;
  }

  try {
    state.recorder.pause();
    state.isPaused = true;
  } catch (error) {
    throw new CameraCaptureError(
      'capture/recorder-error',
      error instanceof Error ? error.message : 'Failed to pause recording',
    );
  }
}

/**
 * Resume video recording
 */
export function resumeVideoRecording(state: VideoRecorderState): void {
  if (!state.isRecording) {
    throw new CameraCaptureError('capture/no-recording-in-progress', 'No recording is in progress');
  }

  if (!state.recorder || !state.isPaused) {
    return;
  }

  try {
    state.recorder.resume();
    state.isPaused = false;
  } catch (error) {
    throw new CameraCaptureError(
      'capture/recorder-error',
      error instanceof Error ? error.message : 'Failed to resume recording',
    );
  }
}

/**
 * Stop video recording
 */
export function stopVideoRecording(state: VideoRecorderState): void {
  if (!state.isRecording) {
    throw new CameraCaptureError('capture/no-recording-in-progress', 'No recording is in progress');
  }

  if (!state.recorder) {
    return;
  }

  try {
    if (state.recorder.state === 'recording' || state.recorder.state === 'paused') {
      state.recorder.stop();
    }
    // onstop handler will clean up and call callbacks
  } catch (error) {
    throw new CameraCaptureError(
      'capture/recorder-error',
      error instanceof Error ? error.message : 'Failed to stop recording',
    );
  }
}

/**
 * Cancel video recording
 */
export function cancelVideoRecording(state: VideoRecorderState): void {
  if (!state.isRecording) {
    throw new CameraCaptureError('capture/no-recording-in-progress', 'No recording is in progress');
  }

  try {
    if (state.recorder) {
      if (state.recorder.state === 'recording' || state.recorder.state === 'paused') {
        state.recorder.stop();
      }
    }

    const error = new CameraCaptureError('capture/recording-canceled', 'Recording was canceled');
    state.onRecordingError?.(error);
    resetRecorderState(state);
  } catch (error) {
    const captureError = new CameraCaptureError(
      'capture/recorder-error',
      error instanceof Error ? error.message : 'Failed to cancel recording',
    );
    state.onRecordingError?.(captureError);
    resetRecorderState(state);
  }
}

/**
 * Reset recorder state
 */
function resetRecorderState(state: VideoRecorderState): void {
  state.recorder = null;
  state.isRecording = false;
  state.isPaused = false;
  state.onRecordingFinished = null;
  state.onRecordingError = null;
}

