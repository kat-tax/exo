import {createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode} from 'react';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import {CameraPicker} from './picker';

type CameraEvent = PhotoFile | VideoFile;
type FlashMode = 'off' | 'on' | 'auto';
type CameraMode = 'photo' | 'video';
type CameraResultByMode<T extends CameraMode> = T extends 'photo' ? PhotoFile : VideoFile;
type CameraCallback<T extends CameraMode> = (event: CameraResultByMode<T>) => void;

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
  openCamera: <T extends CameraMode = 'photo'>(event: CameraCallback<T>, mode?: T) => void;
  closeCamera: () => void;
  setMode: (mode: 'photo' | 'video') => void;
  setCameraPosition: (position: 'front' | 'back') => void;
  setFlashMode: (mode: FlashMode) => void;
  setIsRecording: (recording: boolean) => void;
  setHdrEnabled: (enabled: boolean) => void;
  setRecordingTime: (time: number) => void;
  onResult: ((event: CameraEvent) => void) | null;
}

const CameraContext = createContext<CameraContextValue | null>(null);

export function CameraProvider({children}: {children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hdrEnabled, setHdrEnabled] = useState(false);
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [onResult, setOnResult] = useState<((event: CameraEvent) => void) | null>(null);
  const recordTimeRef = useRef<NodeJS.Timeout | null>(null);

  // Recording timer effect
  useEffect(() => {
    if (isRecording) {
      recordTimeRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordTimeRef.current) {
        clearInterval(recordTimeRef.current);
        recordTimeRef.current = null;
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordTimeRef.current) {
        clearInterval(recordTimeRef.current);
      }
    };
  }, [isRecording]);

  const openCamera = useCallback(<T extends CameraMode = 'photo'>(
    event: CameraCallback<T>,
    cameraMode?: T,
  ) => {
    setMode(cameraMode ?? 'photo');
    setOnResult(() => event);
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

  const handleResult = useCallback((event: CameraEvent) => {
    if (onResult) {
      onResult(event);
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
