import {useState, useEffect} from 'react';
import {RectGroup} from 'app/interface/RectGroup';
import {Stream} from 'live/stacks/Stream';

export function Active() {
  const [streams, setStreams] = useState<string[]>([]);

  useEffect(() => {
    const update = async () => {
      const response = await fetch('https://localhost/api/active');
      const data = await response.json();
      setStreams(data);
    };
    update();
    const i = setInterval(update, 3000);
    return () => clearInterval(i);
  }, []);


  return streams.length ? (
    <RectGroup aspectRatio={16/9}>
      {streams.map(name => (
        <Stream key={name} name={name}/>
      ))}
    </RectGroup>
  ) : null;
}
