import {Sheet} from 'react-exo/sheet';
import {useEffect, useState, useRef} from 'react';
import {View, Text, Pressable, Platform} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {Icon} from 'react-exo/icon';
import {useCameraDevice, Camera} from './lib';
import type {VideoFile} from 'react-native-vision-camera';
import type {CameraRef} from './lib';

type CameraMode = 'photo' | 'video';
type FlashMode = 'off' | 'on' | 'auto';

export function CameraPicker() {
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const [cameraMode, setCameraMode] = useState<CameraMode>('photo');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hdrEnabled, setHdrEnabled] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const cameraDevice = useCameraDevice(cameraPosition);
  const cameraRef = useRef<CameraRef>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cameraDevice) {
      setCameraOpen(true);
    }
  }, [cameraDevice]);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
      } as any);
      console.log('Photo taken:', photo);
      // Handle photo result (e.g., save, preview, etc.)
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const handleShutterPress = () => {
    if (cameraMode === 'photo') {
      handleTakePhoto();
    } else {
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
          // Handle video result (e.g., save, preview, etc.)
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
    setCameraMode((prev) => (prev === 'photo' ? 'video' : 'photo'));
  };

  const toggleFlash = () => {
    setFlashMode((prev) => {
      if (prev === 'off') return 'on';
      if (prev === 'on') return 'auto';
      return 'off';
    });
  };

  const toggleCamera = () => {
    setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Sheet
      open={cameraOpen}
      autoWebSize={380}
      onOpenChange={setCameraOpen}>
      {cameraDevice && (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            device={cameraDevice}
            style={styles.camera}
            isActive={cameraOpen}
            photo={cameraMode === 'photo'}
            video={cameraMode === 'video'}
            audio={cameraMode === 'video'}
            onError={(error) => {
              console.error('>> camera error', error);
            }}
          />
          {/* Top right controls */}
          <View style={styles.topRightControls}>
            {/* Mode toggle */}
            <Pressable
              style={styles.controlButton}
              onPress={toggleMode}>
              <Icon
                size={24}
                color="#000"
                name={cameraMode === 'photo'
                  ? 'ph:camera'
                  : 'ph:video-camera'
                }
              />
            </Pressable>
            {/* HDR toggle */}
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
            {/* Flash toggle */}
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
            <Pressable
              style={[styles.shutterButton, isRecording && styles.shutterButtonRecording]}
              onPress={handleShutterPress}>
              {cameraMode === 'video' && isRecording ? (
                <View style={styles.stopIcon} />
              ) : null}
            </Pressable>
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
      )}
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
}));
