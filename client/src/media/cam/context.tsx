import {createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode} from 'react';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import {CameraPicker} from './picker';

type CameraResult = PhotoFile | VideoFile;
type FlashMode = 'off' | 'on' | 'auto';

interface CameraContextValue {
  // State
  mode: 'photo' | 'video';
  isOpen: boolean;
  cameraPosition: 'front' | 'back';
  flashMode: FlashMode;
  recordingTime: number;
  isRecording: boolean;
  hdrEnabled: boolean;
  // Actions
  openCamera: (onResult: (result: CameraResult) => void, mode?: 'photo' | 'video') => void;
  closeCamera: () => void;
  setMode: (mode: 'photo' | 'video') => void;
  setCameraPosition: (position: 'front' | 'back') => void;
  setFlashMode: (mode: FlashMode) => void;
  setIsRecording: (recording: boolean) => void;
  setHdrEnabled: (enabled: boolean) => void;
  setRecordingTime: (time: number) => void;
  onResult: ((result: CameraResult) => void) | null;
}

const CameraContext = createContext<CameraContextValue | null>(null);

export function CameraProvider({children}: {children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hdrEnabled, setHdrEnabled] = useState(false);
  const [onResult, setOnResult] = useState<((result: CameraResult) => void) | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Recording timer effect
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

  const openCamera = useCallback((callback: (result: CameraResult) => void, cameraMode: 'photo' | 'video' = 'photo') => {
    setMode(cameraMode);
    setOnResult(() => callback);
    setIsOpen(true);
    // Reset state when opening
    setFlashMode('off');
    setRecordingTime(0);
    setIsRecording(false);
    setHdrEnabled(false);
  }, []);

  const closeCamera = useCallback(() => {
    setIsOpen(false);
    setOnResult(null);
    setIsRecording(false);
    setRecordingTime(0);
  }, []);

  const handleResult = useCallback((result: CameraResult) => {
    if (onResult) {
      onResult(result);
    }
    closeCamera();
  }, [onResult, closeCamera]);

  return (
    <CameraContext.Provider value={{
      mode,
      isOpen,
      cameraPosition,
      flashMode,
      recordingTime,
      isRecording,
      hdrEnabled,
      openCamera,
      closeCamera,
      setMode,
      setCameraPosition,
      setFlashMode,
      setIsRecording,
      setHdrEnabled,
      setRecordingTime,
      onResult: handleResult,
    }}>
      {children}
      {isOpen && <CameraPicker/>}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within CameraProvider');
  }
  return context;
}
