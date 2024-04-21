import {useState, useEffect} from 'react';

export interface ShiftProps {
  children: (value: number) => void,
}

export function Shift(props: ShiftProps) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    setTimeout(() => {
      setValue(value === 1 ? 0 : 1);
    }, 1500);
  }, [value]);

  return <>{props.children(value)}</>;
}
