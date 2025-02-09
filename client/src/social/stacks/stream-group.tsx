import {useState, useEffect} from 'react';
import {RectGroup} from 'app/stacks/rectgroup';
import {StreamMedia} from 'social/stacks/stream-media';

export function StreamGroup() {
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
        <StreamMedia key={name} name={name}/>
      ))}
    </RectGroup>
  ) : null;
}
