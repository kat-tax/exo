import {View} from 'react-native';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {CameraCaptureError, CameraRuntimeError} from '../utils/camera-errors';
import {getCameraStream} from '../utils/get-camera-stream';
import {stopCameraStream} from '../utils/stop-camera-stream';
import {takePhotoFromVideo} from '../utils/take-photo';
import {takeSnapshotFromVideo} from '../utils/take-snapshot';
import {detectBarcodesInVideo} from '../hooks/use-code-scanner';

import {
  startVideoRecording,
  pauseVideoRecording,
  resumeVideoRecording,
  stopVideoRecording,
  cancelVideoRecording,
  type VideoRecorderState,
} from '../utils/video-recorder';

import type {
  CameraProps,
  PhotoFile,
  TakePhotoOptions,
  TakeSnapshotOptions,
  RecordVideoOptions,
  Point,
} from 'react-native-vision-camera';

export interface CameraRef {
  takePhoto(options?: TakePhotoOptions): Promise<PhotoFile>;
  takeSnapshot(options?: TakeSnapshotOptions): Promise<PhotoFile>;
  startRecording(options: RecordVideoOptions): void;
  pauseRecording(): Promise<void>;
  resumeRecording(): Promise<void>;
  stopRecording(): Promise<void>;
  cancelRecording(): Promise<void>;
  focus(point: Point): Promise<void>;
}

export const Camera = forwardRef<CameraRef, CameraProps>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isActiveRef = useRef(false);
  const barcodeDetectionIntervalRef = useRef<number | null>(null);
  const recorderStateRef = useRef<VideoRecorderState>({
    recorder: null,
    isRecording: false,
    isPaused: false,
    onRecordingFinished: null,
    onRecordingError: null,
  });

  const {
    style,
    device,
    isActive,
    resizeMode = 'cover',
    onInitialized,
    onStarted,
    onStopped,
    onPreviewStarted,
    onPreviewStopped,
    onError,
    photo,
    video,
    audio,
    codeScanner,
    ...otherProps
  } = props;

  useEffect(() => {
    if (!isActive || !device) {
      stopCamera();
      return;
    }
    startCamera();
    return () => {
      stopCamera();
    };
  }, [isActive, device?.id]);

  // Set up barcode detection when codeScanner is provided
  useEffect(() => {
    if (!codeScanner?.onCodeScanned || !isActive || !videoRef.current) {
      if (barcodeDetectionIntervalRef.current) {
        clearInterval(barcodeDetectionIntervalRef.current);
        barcodeDetectionIntervalRef.current = null;
      }
      return;
    }

    // Start periodic barcode detection (check every 500ms)
    const startBarcodeDetection = () => {
      if (barcodeDetectionIntervalRef.current) {
        clearInterval(barcodeDetectionIntervalRef.current);
      }

      barcodeDetectionIntervalRef.current = window.setInterval(() => {
        if (videoRef.current && isActiveRef.current && codeScanner?.onCodeScanned) {
          detectBarcodesInVideo(videoRef.current, codeScanner.onCodeScanned);
        }
      }, 500);
    };

    // Wait for video to be ready
    const video = videoRef.current;
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      startBarcodeDetection();
    } else {
      video.addEventListener('loadeddata', startBarcodeDetection, {once: true});
    }

    return () => {
      if (barcodeDetectionIntervalRef.current) {
        clearInterval(barcodeDetectionIntervalRef.current);
        barcodeDetectionIntervalRef.current = null;
      }
      video?.removeEventListener('loadeddata', startBarcodeDetection);
    };
  }, [codeScanner?.onCodeScanned, isActive]);

  const startCamera = async () => {
    if (isActiveRef.current || !isActive) return;
    try {
      if (!device) {
        throw new Error('No camera device available');
      }
      const stream = await getCameraStream(device, audio === true);
      // Check if still active after async operation
      if (!isActive) {
        stopCameraStream(stream);
        return;
      }
      streamRef.current = stream;
      isActiveRef.current = true;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      onInitialized?.();
      onStarted?.();
      onPreviewStarted?.();
    } catch (error) {
      onError?.({
        code: 'session/configuration-error',
        message: error instanceof Error ? error.message : 'Failed to start camera',
        cause: error,
      } as any);
    }
  };

  const stopCamera = () => {
    if (!isActiveRef.current) return;
    // Cancel any ongoing recording
    if (recorderStateRef.current.isRecording) {
      try {
        cancelVideoRecording(recorderStateRef.current);
      } catch {
        // Ignore errors when stopping camera
      }
    }
    // Stop barcode detection
    if (barcodeDetectionIntervalRef.current) {
      clearInterval(barcodeDetectionIntervalRef.current);
      barcodeDetectionIntervalRef.current = null;
    }
    stopCameraStream(streamRef.current);
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    isActiveRef.current = false;
    onStopped?.();
    onPreviewStopped?.();
  };

  // Expose ref methods
  useImperativeHandle(ref, () => ({
    async takePhoto(options?: TakePhotoOptions): Promise<PhotoFile> {
      if (!photo) {
        throw new CameraCaptureError('capture/photo-not-enabled', 'Photo capture is not enabled');
      }
      if (!videoRef.current || !isActiveRef.current) {
        throw new CameraRuntimeError(
          'session/camera-not-ready',
          'Camera is not ready. Make sure the camera is active and initialized.',
        );
      }
      return takePhotoFromVideo(videoRef.current, options);
    },

    async takeSnapshot(options?: TakeSnapshotOptions): Promise<PhotoFile> {
      if (!videoRef.current || !isActiveRef.current) {
        throw new CameraCaptureError(
          'capture/snapshot-failed-preview-not-enabled',
          'Camera preview is not enabled. Make sure the camera is active and initialized.',
        );
      }
      return takeSnapshotFromVideo(videoRef.current, options);
    },

    startRecording(options: RecordVideoOptions): void {
      if (!video) {
        throw new CameraCaptureError('capture/video-not-enabled', 'Video recording is not enabled');
      }
      if (!streamRef.current || !isActiveRef.current) {
        throw new CameraRuntimeError(
          'session/camera-not-ready',
          'Camera is not ready. Make sure the camera is active and initialized.',
        );
      }
      startVideoRecording(streamRef.current, options, recorderStateRef.current);
    },

    async pauseRecording(): Promise<void> {
      pauseVideoRecording(recorderStateRef.current);
    },

    async resumeRecording(): Promise<void> {
      resumeVideoRecording(recorderStateRef.current);
    },

    async stopRecording(): Promise<void> {
      stopVideoRecording(recorderStateRef.current);
    },

    async cancelRecording(): Promise<void> {
      cancelVideoRecording(recorderStateRef.current);
    },

    async focus(_point: Point): Promise<void> {
      // Web browsers don't support programmatic camera focus
      // This is a no-op for web compatibility
      // In the future, we could try to use MediaStreamTrack.applyConstraints
      // but it's not widely supported and doesn't work the same way as native focus
      return Promise.resolve();
    },
  }));

  // Filter out props that don't apply to web
  const webProps = {
    ...otherProps,
    // Remove native-only props that don't apply to web
    androidPreviewViewType: undefined,
    enableZoomGesture: undefined,
    enableBufferCompression: undefined,
    enableFpsGraph: undefined,
    enableDepthData: undefined,
    enablePortraitEffectsMatteDelivery: undefined,
  };

  return (
    <View style={style} {...webProps}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={!video} // Unmute if video recording is enabled (for audio)
        style={{
          width: '100%',
          height: '100%',
          objectFit: resizeMode === 'contain' ? 'contain' : 'cover',
          transform: device?.position === 'front' ? 'scaleX(-1)' : 'none',
        }}
      />
    </View>
  );
});

Camera.displayName = 'Camera';
