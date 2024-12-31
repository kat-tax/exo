import type {StyleProp, ViewStyle} from 'react-native';

export interface GameProps {
  /** Platform to emulate */
  platform: keyof typeof PLATFORMS,
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

export const PLATFORMS = {
  'atari2600': 'Atari 2600',
  'atari7800': 'Atari 7800',
  'jaguar': 'Atari Jaguar',
  'lynx': 'Atari Lynx',
  'ws': 'Bandai WonderSwan (Color)',
  'coleco': 'ColecoVision',
  'vice_x64': 'Commodore 64',
  'pcfx': 'NEC PC-FX',
  'pce': 'NEC TurboGrafx-16/SuperGrafx/PC Engine',
  'n64': 'Nintendo 64',
  'nds': 'Nintendo DS',
  'nes': 'Nintendo Entertainment System',
  'gba': 'Nintendo Game Boy Advance',
  'gb': 'Nintendo Game Boy',
  'psx': 'PlayStation',
  'sega32x': 'Sega 32X',
  'segaCD': 'Sega CD',
  'segaGG': 'Sega Game Gear',
  'segaMS': 'Sega Master System',
  'segaMD': 'Sega Mega Drive',
  'segaSaturn': 'Sega Saturn',
  'ngp': 'SNK NeoGeo Pocket (Color)',
  'snes': 'Super Nintendo Entertainment System',
  'vb': 'Virtual Boy',
} as const;