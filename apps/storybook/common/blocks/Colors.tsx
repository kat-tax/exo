import {ColorPalette, ColorItem} from '@storybook/blocks';
import {extractBasics, extractScales, getBasicProps} from '../utils/colors';
import {pallete} from 'ui/theme';

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
