import {useState, useEffect} from 'react';
import {isOnline, suscribeOnline} from 'react-exo/device';

export function useOnline() {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    isOnline().then(setOnline);
    return suscribeOnline(setOnline);
  }, []);
  return online;
}
