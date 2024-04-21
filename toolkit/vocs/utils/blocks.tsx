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

export interface ThemeSwitcherProps {
  onChange: (name: string) => true | undefined,
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const [theme, setTheme] = useState(() => {
     const storedTheme = localStorage.getItem('vocs.theme');
     return storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
 
  useEffect(() => {
     const updateTheme = () => {
       const newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
       setTheme(newTheme);
       localStorage.setItem('vocs.theme', newTheme);
       document.documentElement.classList.add(newTheme);
     };
 
     updateTheme();
     window.addEventListener('storage', updateTheme);
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
 
     return () => {
       window.removeEventListener('storage', updateTheme);
       window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme);
     };
  }, []);

  useEffect(() => {
    props.onChange(theme);
  }, [theme]);

  return <></>;
}