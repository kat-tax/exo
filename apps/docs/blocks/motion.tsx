import {useState, useEffect} from 'react';

export interface ShiftProps {
  children: (value: number) => void;
}

export function Shift(props: ShiftProps) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => v === 0 ? 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{props.children(value)}</>;
}
