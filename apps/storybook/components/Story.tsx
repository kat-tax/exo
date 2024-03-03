import 'react-exo/video.css';
import 'react-exo/checkbox.css';
import 'react-exo/switch.css';
import 'react-exo/radio.css';
import 'react-exo/slider.css';

interface StoryProps {
  children: JSX.Element,
}

export function Story(props: StoryProps) {
  return (
    <>
      {props.children}
    </>
  );
}
