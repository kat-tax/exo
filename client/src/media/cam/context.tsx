import {createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode} from 'react';
import type {PhotoFile, VideoFile} from 'react-native-vision-camera';
import {CameraPicker} from './picker';

type CameraMode = 'photo' | 'video';
type CameraFlash = 'off' | 'on' | 'auto';
type CameraPosition = 'front' | 'back';
type CameraResult = PhotoFile | VideoFile;
type CameraResultByMode<T extends CameraMode> = T extends 'photo' ? PhotoFile : VideoFile;
type CameraCallback<T extends CameraMode> = (result: CameraResultByMode<T>) => void;

interface CameraContextValue {
  // State
  mode: CameraMode;
  isOpen: boolean;
  isRecording: boolean;
  recordingTime: number;
  cameraPosition: CameraPosition;
  hdrEnabled: boolean;
  flashMode: CameraFlash;
  // Actions
  openCamera: <T extends CameraMode = 'photo'>(callback: CameraCallback<T>, mode?: T) => void;
  closeCamera: () => void;
  setMode: (mode: CameraMode) => void;
  setIsRecording: (recording: boolean) => void;
  setRecordingTime: (time: number) => void;
  setHdrEnabled: (enabled: boolean) => void;
  setCameraPosition: (position: CameraPosition) => void;
  setFlashMode: (mode: CameraFlash) => void;
  onResult: (result: CameraResult) => void;
}

const CameraContext = createContext<CameraContextValue | null>(null);

export function CameraProvider({children}: {children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CameraMode>('photo');
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hdrEnabled, setHdrEnabled] = useState(false);
  const [flashMode, setFlashMode] = useState<CameraFlash>('off');
  const recordTimeRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<CameraCallback<CameraMode> | null>(null);

  const openCamera = useCallback(<T extends CameraMode = 'photo'>(
    callback: CameraCallback<T>,
    cameraMode?: T,
  ) => {
    setMode(cameraMode ?? 'photo');
    callbackRef.current = callback;
    setIsOpen(true);
    // Reset state when opening
    setFlashMode('off');
    setRecordingTime(0);
    setIsRecording(false);
    setHdrEnabled(false);
  }, []);

  const closeCamera = useCallback(() => {
    setIsOpen(false);
    callbackRef.current = null;
    setIsRecording(false);
    setRecordingTime(0);
  }, []);

  const handleResult = useCallback((result: CameraResult) => {
    callbackRef.current?.(result);
    closeCamera();
  }, [closeCamera]);

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
