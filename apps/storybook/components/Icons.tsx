import {useState, useEffect} from 'react';
import {IconGallery, IconItem} from '@storybook/blocks';
import {loadIconSet} from '../utils/icons';
import {Icon} from 'react-exo/icon';

interface IconsProps {
  set: string,
}

export function Icons(props: IconsProps) {
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    loadIconSet(props.set).then(list => {
      setIcons(list);
    });
  }, [props.set]);

  return (
    <IconGallery>
      {icons.map((icon: string) => (
        <IconItem key={icon} name={icon.split(':')[1]}>
          <Icon name={icon} color="#666" width={16} height={16}/>
        </IconItem>
      ))}
    </IconGallery>
  );
}
