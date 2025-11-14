import {Sheet} from 'react-exo/sheet';
import {useRef} from 'react';
import {View, Text, Pressable, Platform} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {Icon} from 'react-exo/icon';

import {useCamera} from './context';
import {useCameraDevice, Camera, useCodeScanner} from './lib';

import type {VideoFile, Code, CodeScannerFrame} from 'react-native-vision-camera';
import type {CameraRef} from './lib';

export function CameraPicker() {
  const {
    isOpen,
    mode,
    cameraPosition,
    flashMode,
    recordingTime,
    isRecording,
    hdrEnabled,
    onResult,
    closeCamera,
    setMode,
    setCameraPosition,
    setFlashMode,
    setIsRecording,
    setHdrEnabled,
  } = useCamera();

  const cameraDevice = useCameraDevice(cameraPosition);
  const cameraRef = useRef<CameraRef>(null);

  // Set up code scanner for QR code scanning
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes: Code[], _frame: CodeScannerFrame) => {
      if (codes.length > 0 && mode === 'code') {
        // Use the first detected code
        onResult(codes[0]);
      }
    },
  });

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
      });
      console.log('Photo taken:', photo);
      onResult(photo);
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const handleShutterPress = () => {
    if (mode === 'photo') {
      handleTakePhoto();
    } else if (mode === 'video') {
      if (isRecording) {
        handleStopRecording();
      } else {
        handleStartRecording();
      }
    }
  };

  const handleStartRecording = () => {
    if (!cameraRef.current) return;
    try {
      cameraRef.current.startRecording({
        onRecordingFinished: (video: VideoFile) => {
          console.log('Video recorded:', video);
          setIsRecording(false);
          onResult(video);
        },
        onRecordingError: (error) => {
          console.error('Recording error:', error);
          setIsRecording(false);
        },
      });
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = () => {
    if (!cameraRef.current) return;
    try {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const toggleMode = () => {
    if (mode === 'photo') {
      setMode('video');
    } else if (mode === 'video') {
      setMode('code');
    } else {
      setMode('photo');
    }
  };

  const toggleFlash = () => {
    if (flashMode === 'off') {
      setFlashMode('on');
    } else if (flashMode === 'on') {
      setFlashMode('auto');
    } else {
      setFlashMode('off');
    }
  };

  const toggleCamera = () => {
    setCameraPosition(cameraPosition === 'back' ? 'front' : 'back');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Sheet
      open={isOpen}
      autoWebSize={380}
      onOpenChange={(open) => !open && closeCamera()}>
      <View style={styles.container}>
        <View style={styles.viewport}>
          {cameraDevice && (
            <Camera
              ref={cameraRef}
              device={cameraDevice}
              style={styles.camera}
              isActive={isOpen}
              photo={mode === 'photo'}
              video={mode === 'video' || mode === 'code'}
              audio={mode === 'video'}
              codeScanner={mode === 'code' ? codeScanner : undefined}
              onError={(error) => {
                console.error('>> camera error', error);
              }}
            />
          )}
        </View>
        {/* Top right controls */}
        <View style={styles.topRightControls}>
          {/* Mode toggle */}
          <Pressable
            style={styles.controlButton}
            onPress={toggleMode}>
            <Icon
              size={24}
              color="#000"
              name={mode === 'photo'
                ? 'ph:camera'
                : mode === 'video'
                  ? 'ph:video-camera'
                  : 'ph:qr-code'
              }
            />
          </Pressable>
          {/* HDR toggle */}
          {mode !== 'code' && (
            <Pressable
              style={styles.controlButton}
              onPress={() => setHdrEnabled(!hdrEnabled)}>
              <Icon
                size={24}
                color="#000"
                name={hdrEnabled
                  ? "ph:circle-half"
                  : "ph:circle-half-fill"
                }
              />
            </Pressable>
          )}
          {/* Flash toggle */}
          {mode !== 'code' && (
            <Pressable
              style={styles.controlButton}
              onPress={toggleFlash}>
              <Icon
                size={24}
                color="#000"
                name={
                  flashMode === 'off'
                    ? 'ph:lightning-slash'
                    : flashMode === 'on'
                      ? 'ph:lightning-fill'
                      : 'ph:lightning-a'
                }
              />
            </Pressable>
          )}
        </View>
        {/* Recording indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
          </View>
        )}
        {/* Bottom controls */}
        <View style={styles.bottomControls}>
          {mode !== 'code' && (
            <Pressable
              style={[styles.shutterButton, isRecording && styles.shutterButtonRecording]}
              onPress={handleShutterPress}>
              {mode === 'video' && isRecording ? (
                <View style={styles.stopIcon} />
              ) : null}
            </Pressable>
          )}
          {mode === 'code' && (
            <View style={styles.codeScanningIndicator}>
              <Text style={styles.codeScanningText}>Scanning QR code...</Text>
            </View>
          )}
          <Pressable
            style={styles.flipButton}
            onPress={toggleCamera}>
            <Icon
              name="ph:camera-rotate"
              size={24}
              color="#000"
            />
          </Pressable>
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  viewport: {
    width: 448,
    height: 336,
    backgroundColor: theme.colors.neutral,
  },
  topRightControls: {
    position: 'absolute',
    top: theme.display.space4,
    right: theme.display.space4,
    flexDirection: 'column',
    gap: theme.display.space3,
    alignItems: 'center',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingIndicator: {
    position: 'absolute',
    top: theme.display.space4,
    left: theme.display.space4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.8)',
    paddingHorizontal: theme.display.space3,
    paddingVertical: theme.display.space2,
    borderRadius: theme.display.radius2,
    gap: theme.display.space2,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
  },
  recordingTime: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        fontFamily: 'Courier',
      },
      default: {
        fontFamily: 'monospace',
      },
    }),
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: theme.display.space6,
    paddingHorizontal: theme.display.space4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space4,
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: theme.colors.mutedForeground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButtonRecording: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  stopIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
  },
  codeScanningIndicator: {
    paddingHorizontal: theme.display.space4,
    paddingVertical: theme.display.space2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.display.radius2,
  },
  codeScanningText: {
    color: theme.colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
}));
