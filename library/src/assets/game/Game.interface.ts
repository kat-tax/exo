import type {StyleProp, ViewStyle} from 'react-native';

export interface GameProps {
  /** Platform to emulate */
  platform: typeof GamePlatforms[keyof typeof GamePlatforms],
  /** Url to the rom file */
  url: string,
  /** Name of the game */
  name: string,
  /** Url to the bios file */
  bios: string,
  /** Url to the save state file */
  save?: string,
  /** Url to the patch file */
  patch?: string,
  /** Url to the game parent data */
  parent?: string,
  /** Cheats for the game */
  cheats?: string[],
  /** Whether the game should use threads (default: false) */
  threads?: boolean,
  /** Whether the game should start on load (default: false) */
  startOnLoaded?: boolean,
  /** Whether the game should start in fullscreen (default: false) */
  fullscreen?: boolean,
  /** Master volume of the game */
  volume?: number,
  /** A locale to set the UI language */
  language?: string,
  /** Hex color for the UI background */
  background?: string,
  /** Whether the background should be blurred (default: false) */
  blur?: boolean,
  /** Hex color for the UI theme */
  accent?: string,
  /** The style of the view container */
  style?: StyleProp<ViewStyle>,
}

export const GamePlatforms = {
  'Atari 2600': 'atari2600',
  'Atari 7800': 'atari7800',
  'Atari Jaguar': 'jaguar',
  'Atari Lynx': 'lynx',
  'Bandai WonderSwan (Color)': 'ws',
  'ColecoVision': 'coleco',
  'Commodore 64': 'vice_x64',
  'NEC PC-FX': 'pcfx',
  'NEC TurboGrafx-16/SuperGrafx/PC Engine': 'pce',
  'Nintendo 64': 'n64',
  'Nintendo DS': 'nds',
  'Nintendo Entertainment System': 'nes',
  'Nintendo Game Boy Advance': 'gba',
  'Nintendo Game Boy': 'gb',
  'PlayStation': 'psx',
  'Sega 32X': 'sega32x',
  'Sega CD': 'segaCD',
  'Sega Game Gear': 'segaGG',
  'Sega Master System': 'segaMS',
  'Sega Mega Drive': 'segaMD',
  'Sega Saturn': 'segaSaturn',
  'SNK NeoGeo Pocket (Color)': 'ngp',
  'Super Nintendo Entertainment System': 'snes',
  'Virtual Boy': 'vb',
} as const;
