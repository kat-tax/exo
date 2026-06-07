/// <reference types="vite/client"/>

import type {SvgProps} from 'react-native-svg';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {AppThemes, AppBreakpoints} from 'design/styles';
import type {RootStackParamList} from 'app/nav';

// Navigation types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface ScreenProps<T extends keyof RootStackParamList> extends NativeStackScreenProps<RootStackParamList, T> {}
  }
}

// Evolu types
declare global {
  var __EVOLU_RESETTING_APP_OWNER__: boolean;
}

// Platform globals
declare global {
  var __WEB__: boolean;
  var __NATIVE__: boolean;
  var __ANDROID__: boolean;
  var __WINDOWS__: boolean;
  var __MACOS__: boolean;
  var __IOS__: boolean;
  var __TV__: boolean;
  var __XR__: boolean;
  var __TOUCH__: boolean;
}

// File System Observer API
declare global {
  type FileSystemChangeType =
    | 'appeared'
    | 'disappeared'
    | 'modified'
    | 'moved'
    | 'unknown'
    | 'errored';

  interface FileSystemObserverObserveOptions {
    recursive?: boolean;
  }

  interface FileSystemChangeRecord {
    readonly root: FileSystemHandle;
    readonly changedHandle: FileSystemHandle;
    readonly relativePathComponents: readonly string[];
    readonly type: FileSystemChangeType;
    readonly relativePathMovedFrom: readonly string[] | null;
  }

  type FileSystemObserverCallback = (
    records: FileSystemChangeRecord[],
    observer: FileSystemObserver
  ) => void;

  class FileSystemObserver {
    constructor(callback: FileSystemObserverCallback);
    observe(handle: FileSystemHandle, options?: FileSystemObserverObserveOptions): Promise<void>;
    unobserve(handle: FileSystemHandle): void;
    disconnect(): void;
  }

  // File System Sync Access Handle API
  interface FileSystemReadWriteOptions {
    at?: number;
  }

  interface FileSystemSyncAccessHandle {
    /**
     * Closes an open synchronous file handle, disabling any further operations on it
     * and releasing the exclusive lock previously put on the file.
     */
    close(): void;

    /**
     * Persists any changes made to the file associated with the handle via the write() method to disk.
     */
    flush(): void;

    /**
     * Returns the size of the file associated with the handle in bytes.
     */
    getSize(): number;

    /**
     * Reads the content of the file associated with the handle into a specified buffer,
     * optionally at a given offset.
     * @param buffer - The buffer to read data into (ArrayBuffer or ArrayBufferView)
     * @param options - Options specifying the offset to read from
     * @returns The number of bytes read
     */
    read(buffer: ArrayBuffer | ArrayBufferView, options?: FileSystemReadWriteOptions): number;

    /**
     * Resizes the file associated with the handle to a specified number of bytes.
     * @param newSize - The new size in bytes
     */
    truncate(newSize: number): void;

    /**
     * Writes the content of a specified buffer to the file associated with the handle,
     * optionally at a given offset.
     * @param buffer - The data to write (ArrayBuffer or ArrayBufferView)
     * @param options - Options specifying the offset to write at
     * @returns The number of bytes written
     */
    write(buffer: ArrayBuffer | ArrayBufferView, options?: FileSystemReadWriteOptions): number;
  }

  // File System Access API - Directory and File Handles
  interface FileSystemDirectoryHandle extends FileSystemHandle {
    readonly kind: 'directory';
    values(): AsyncIterableIterator<FileSystemHandle>;
    getDirectoryHandle(name: string, options?: {create?: boolean}): Promise<FileSystemDirectoryHandle>;
    getFileHandle(name: string, options?: {create?: boolean}): Promise<FileSystemFileHandle>;
  }

  interface FileSystemFileHandle extends FileSystemHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
    createSyncAccessHandle(): Promise<FileSystemSyncAccessHandle>;
  }
}

// Set Unistyles theme types
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

// Import assets
declare module '*.svg' {
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Merge RN platform extras
import 'react-native';
declare module 'react-native' {
  interface PlatformStatic {
    isVision: boolean;
  }
  interface ViewProps {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    accessibilityRole?: string;
    href?: string;
    hrefAttrs?: {
      rel: 'noreferrer';
      target?: '_blank';
    };
  }
  interface ViewStyle {
    transitionProperty?: string;
    transitionDuration?: string;
  }
  interface TextProps {
    accessibilityComponentType?: never;
    accessibilityTraits?: never;
    href?: string;
    hrefAttrs?: {
      rel: 'noreferrer';
      target?: '_blank';
    };
  }
  interface TextInput {
    value?: string;
  }
  interface TextInputKeyPressEventData {
    key: string;
    metaKey: boolean;
    ctrlKey: boolean;
  }
  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }
  interface GestureResponderEvent {
    shiftKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
  }
}
