import {createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode} from 'react';
import type {PhotoFile, VideoFile, Code} from 'react-native-vision-camera';
import {CameraPicker} from './picker';

type CameraMode = 'photo' | 'video' | 'code';
type CameraFlash = 'off' | 'on' | 'auto';
type CameraPosition = 'front' | 'back';
type CameraOpenOptions = {forceMode?: boolean};
type CameraResult = PhotoFile | VideoFile | Code;
type CameraResultByMode<T extends CameraMode> = T extends 'photo' ? PhotoFile : T extends 'video' ? VideoFile : Code;
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
  forceMode: boolean;
  // Actions
  onResult: (result: CameraResult) => void;
  openCamera: <T extends CameraMode = 'photo'>(callback: CameraCallback<T>, mode?: T, options?: CameraOpenOptions) => void;
  closeCamera: () => void;
  setMode: (mode: CameraMode) => void;
  setFlashMode: (mode: CameraFlash) => void;
  setHdrEnabled: (enabled: boolean) => void;
  setIsRecording: (recording: boolean) => void;
  setRecordingTime: (time: number) => void;
  setCameraPosition: (position: CameraPosition) => void;
}

const CameraContext = createContext<CameraContextValue | null>(null);

export function CameraProvider({children}: {children: ReactNode}) {
  const [mode, setMode] = useState<CameraMode>('photo');
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const [hdrEnabled, setHdrEnabled] = useState(false);
  const [flashMode, setFlashMode] = useState<CameraFlash>('off');
  const [forceMode, setForceMode] = useState(false);

  const refRecordTime = useRef<NodeJS.Timeout | null>(null);
  const refCallback = useRef<CameraCallback<CameraMode> | null>(null);

  const openCamera = useCallback(<T extends CameraMode = 'photo'>(
    callback: CameraCallback<T>,
    cameraMode?: T,
    options?: CameraOpenOptions,
  ) => {
    setMode(cameraMode ?? 'photo');
    setForceMode(options?.forceMode ?? false);
    refCallback.current = callback;
    setIsOpen(true);
    // Reset state when opening
    setFlashMode('off');
    setRecordingTime(0);
    setIsRecording(false);
    setHdrEnabled(false);
  }, []);

  const closeCamera = useCallback(() => {
    setIsOpen(false);
    refCallback.current = null;
    setForceMode(false);
    setIsRecording(false);
    setRecordingTime(0);
  }, []);

  const onResult = useCallback((result: CameraResult) => {
    refCallback.current?.(result);
    closeCamera();
  }, [closeCamera]);

  // Recording timer effect
  useEffect(() => {
    if (isRecording) {
      refRecordTime.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (refRecordTime.current) {
        clearInterval(refRecordTime.current);
        refRecordTime.current = null;
      }
      setRecordingTime(0);
    }
    return () => {
      if (refRecordTime.current) {
        clearInterval(refRecordTime.current);
      }
    };
  }, [isRecording]);

  return (
    <CameraContext.Provider value={{
      mode,
      isOpen,
      isRecording,
      recordingTime,
      cameraPosition,
      hdrEnabled,
      flashMode,
      forceMode,
      onResult,
      openCamera,
      closeCamera,
      setMode,
      setFlashMode,
      setHdrEnabled,
      setIsRecording,
      setRecordingTime,
      setCameraPosition,
    }}>
      {children}
      <CameraPicker/>
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
