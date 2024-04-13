import 'react-exo/checkbox.css';
import 'react-exo/switch.css';
import 'react-exo/radio.css';
import 'react-exo/slider.css';

import {useState, useEffect} from 'react';
import {ColorPalette, ColorItem, IconGallery, IconItem} from '@storybook/blocks';
import {extractBasics, extractScales, getBasicProps} from 'utils/colors';
import {loadIconSet} from 'utils/icons';
import {pallete} from 'design/theme';
import {Icon} from 'react-exo/icon';

export function Story(props: React.PropsWithChildren) {
  return (
    <>
      {props.children}
    </>
  );
}

export function Colors() {
  return (
    <ColorPalette>
      <ColorItem {...getBasicProps(extractBasics(pallete))}/>
      {Object.entries(extractScales(pallete)).map(([name, colors]) => (
        <ColorItem
          key={name}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
          subtitle={`${Object.keys(colors).length} colors`}
          colors={colors}
        />
      ))}
    </ColorPalette>
  );
}

export function Icons(props: {set: string}) {
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
          <Icon name={icon} color="#666" size={16}/>
        </IconItem>
      ))}
    </IconGallery>
  );
}
