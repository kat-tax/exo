import {View} from 'react-native';
import {useEffect, useRef} from 'react';
import {getCameraStream} from '../utils/get-camera-stream';
import {stopCameraStream} from '../utils/stop-camera-stream';
import type {CameraProps} from 'react-native-vision-camera';

/**
 * Camera component polyfill using web video element
 * This provides a web-compatible implementation of react-native-vision-camera
 */
export function Camera(props: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isActiveRef = useRef(false);
  const {style, device, isActive, resizeMode = 'cover', onInitialized, onStarted, onStopped, onPreviewStarted, onPreviewStopped, onError, ...otherProps} = props;

  useEffect(() => {
    if (!isActive) {
      stopCamera();
      return;
    }
    if (!device) {
      onError?.({
        code: 'device/no-device',
        message: 'No camera device available',
        cause: undefined,
      } as any);
      return;
    }
    startCamera();
    return () => {
      stopCamera();
    };
  }, [isActive, device?.id]);

  const startCamera = async () => {
    if (isActiveRef.current) return;
    try {
      if (!device) {
        throw new Error('No camera device available');
      }
      const stream = await getCameraStream(device);
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
    stopCameraStream(streamRef.current);
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    isActiveRef.current = false;
    onStopped?.();
    onPreviewStopped?.();
  };

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
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: resizeMode === 'contain' ? 'contain' : 'cover',
          transform: device?.position === 'front' ? 'scaleX(-1)' : 'none',
        }}
      />
    </View>
  );
}
