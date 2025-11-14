import {FS} from 'react-exo/fs';
import {useCallback} from 'react';
import {useCamera} from 'media/cam/context';
import {getStartInDir, filterJunkFiles} from 'media/dir/utils/hfs/path';

export function useImportHfs() {
  const {openCamera} = useCamera();

  /** Create a new folder */
  const newFolder = useCallback(async (path: string) => {
    const fs = await FS.init('local');
    // Check if directory exists, append number (1) until it doesn't exist
    let i = 1;
    let newPath = path;
    while (await fs?.isDirectory?.(newPath)) {
      newPath = i === 1 ? path : `${path} (${i})`;
      i++;
    }
    await fs?.createDirectory?.(newPath);
    return newPath;
  }, []);

  /** Import a folder from the device */
  const importFolder = useCallback(async (path = '') => {
    const startIn = getStartInDir(path);
    const timer = performance.now();
    const files = await FS.pickDirectory({startIn});
    await FS.importFiles(path, filterJunkFiles(files));
    console.log('>> fs [imported folder]', files, performance.now() - timer);
  }, []);

  /** Import a file from the device */
  const importFile = useCallback(async (path = '') => {
    const startIn = getStartInDir(path);
    const timer = performance.now();
    const from = await FS.pick({startIn, multiple: true});
    await FS.importFiles(path, filterJunkFiles(from));
    console.log('>> fs [imported files]', from, performance.now() - timer);
  }, []);

  /** Import a camera from the device */
  const importCam = useCallback(async (path = '', mode: 'photo' | 'video' | 'code' = 'photo') => {
    try {
      const timer = performance.now();
      return new Promise<void>((resolve, reject) => {
        openCamera(async (result) => {
          try {
            if (!('path' in result)) {
              if (result.value) {
                alert(result.value);
                resolve();
              } else {
                reject();
              }
              return;
            }
            // Convert blob URL to File object
            const response = await fetch(result.path);
            const blob = await response.blob();
            // Determine file extension and name based on type
            const isVideo = 'duration' in result;
            const extension = isVideo ? (result.path.includes('webm') ? 'webm' : 'mp4') : 'jpg';
            const fileName = `camera-${Date.now()}.${extension}`;
            const type = blob.type || (isVideo ? 'video/mp4' : 'image/jpeg');
            // Create a File object from the blob
            const file = new File([blob], fileName, {type});
            await FS.importFiles(path, [file]);
            console.log('>> fs [imported camera]', fileName, performance.now() - timer);
            resolve();
          } catch (error) {
            console.error('>> fs [camera error]', error);
            reject(error);
          }
        }, mode);
      });
    } catch (error) {
      console.error('>> fs [camera error]', error);
      throw error;
    }
  }, [openCamera]);

  return {
    newFolder,
    importFolder,
    importFile,
    importCam,
  };
}
