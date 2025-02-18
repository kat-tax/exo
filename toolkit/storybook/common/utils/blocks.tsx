import 'design/styles';

import 'react-exo/checkbox.css';
import 'react-exo/switch.css';
import 'react-exo/radio.css';
import 'react-exo/slider.css';

import {useState, useEffect, useCallback} from 'react';
import {useInitialTheme, UnistylesRuntime} from 'react-native-unistyles';
import {ColorPalette, ColorItem, IconGallery, IconItem} from '@storybook/blocks';
import {extractBasics, extractScales, getBasicProps} from 'utils/colors';
import {themes, palette, initialTheme} from 'design/theme';
import {loadIconSet} from 'utils/icons';
import {Icon} from 'react-exo/icon';

import type {Globals, Parameters} from '@storybook/types';

export function Story(props: {
  children: React.ReactNode,
  globals: Globals,
  parameters: Parameters,
}) {
  const {children, globals, parameters} = props;
  const getCurrentTheme = useCallback(() => {
    let theme = initialTheme;
    // Runtime theme
    if (globals?.backgrounds) {
      const color = globals?.backgrounds?.value;
      if (color === 'transparent') {
        theme = initialTheme;
      } else {
        const [name] = Object.entries(themes).find(([_, t]) =>
          t.colors.background === color) || [initialTheme];
        theme = name as never;
      }
    // Theme set in the toolbar
    } else if (parameters?.backgrounds) {
      theme = parameters?.backgrounds?.default;
    }
    return theme;
  }, [globals, parameters]);

  useInitialTheme(getCurrentTheme() as never);
  
  useEffect(() => {
    const theme = getCurrentTheme();
    UnistylesRuntime.setTheme(theme as never);
  }, [getCurrentTheme]);

  return <>{children}</>
}

export function Colors() {
  return (
    <ColorPalette>
      <ColorItem {...getBasicProps(extractBasics(palette))}/>
      {Object.entries(extractScales(palette)).map(([name, colors]) => (
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
