import {useEffect, useState} from 'react';

export type Location = [number, number];

export function useLocation() {
  const [location, setLocation] = useState<Location>([0,0]);

  useEffect(() => {
    const query = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        setLocation([latitude, longitude]);
      });
    }
    query();
    const i = setInterval(query, 1000);
    return () => clearInterval(i);
  }, []);

  return location;
}
