import {useState, useEffect} from 'react';
import {Device} from 'react-exo/device';

export function useOnline() {
  const [isOnline, setOnline] = useState(false);
  useEffect(() => {
    Device.isOnline().then(setOnline);
    return Device.suscribeOnline(setOnline);
  }, []);
  return isOnline;
}
