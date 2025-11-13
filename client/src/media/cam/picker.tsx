import {Sheet} from 'react-exo/sheet';
import {useEffect, useState} from 'react';
import {useCameraDevice, Camera} from './lib';

export function CameraPicker() {
  const cameraDevice = useCameraDevice('back');
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    if (cameraDevice) {
      setCameraOpen(true);
    }
  }, [cameraDevice]);

  return (
    <Sheet
      open={cameraOpen}
      autoWebSize={380}
      onOpenChange={setCameraOpen}>
      {cameraDevice && (
        <Camera
          device={cameraDevice}
          isActive={true}
          onError={(error) => {
            console.error('>> camera error', error);
          }}
        />
      )}
    </Sheet>
  );
}
