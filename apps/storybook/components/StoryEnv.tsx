import 'react-exo/video.css';
import 'react-exo/checkbox.css';
import 'react-exo/switch.css';
import 'react-exo/radio.css';
import 'react-exo/slider.css';

interface StoryEnvProps {
  children: JSX.Element,
}

export function StoryEnv(props: StoryEnvProps) {
  return (
    <>
      {props.children}
    </>
  )
}
