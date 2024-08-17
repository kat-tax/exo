import {fs} from 'react-exo/fs';
import {fetchIPFS} from 'media/utils/ipfs'
import type {GameProps} from 'react-exo/game';

export enum FileType {
  Binary = 'Binary',
  Text = 'Text',
  Note = 'Note',
  Document = 'Document',
  Spreadsheet = 'Spreadsheet',
  Presentation = 'Presentation',
  Markdown = 'Markdown',
  Audio = 'Audio',
  Video = 'Video',
  Image = 'Image',
  Model = 'Model',
  Lottie = 'Lottie',
  Rive = 'Rive',
  Game = 'Game',
  Book = 'Book',
  Pdf = 'Pdf',
  Map = 'Map',
}

export type FileOptions = {
  [FileType.Book]: {
    continuous: boolean,
  },
  [FileType.Game]: {
    platform: GameProps['platform'],
  },
} & Record<FileType, Record<string, unknown>>;

export type FileData = {
  [K in FileType]: [K, FileOptions[K extends keyof FileOptions ? K : never]];
}[FileType];

export function getFileInfo(ext: string): FileData {
  switch (ext) {
    // Models
    case 'glb':
    case 'gltf':
      return [FileType.Model, {}];
    // Animations
    case 'lottie':
      return [FileType.Lottie, {}];
    case 'riv':
      return [FileType.Rive, {}];
    // Videos
    case 'mp4':
    case 'm4v':
    case 'mov':
    case 'avi':
    case 'mkv':
    case 'wmv':
    case 'flv':
    case 'vob':
    case 'ogv':
    case 'ogg':
    case 'drc':
    case 'webm':
    case 'm3u8':
      return [FileType.Video, {}];
    // Images
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'ico':
    case 'tiff':
    case 'webp':
    case 'avif':
    case 'heic':
    case 'heif':
    case 'svg':
    case 'raw':
      return [FileType.Image, {}];
    // Documents
    case 'pdf':
      return [FileType.Pdf, {}];
    // Markdown
    case 'md':
    case 'mdx':
    case 'markdown':
      return [FileType.Markdown, {}];
    // Books
    case 'epub':
      return [FileType.Book, {continuous: true}];
    // Roms
    case 'n64':
    case 'v64':
    case 'z64':
      return [FileType.Game, {platform: 'n64'}];
    case 'gb':
    case 'gbc':
      return [FileType.Game, {platform: 'gb'}];
    case 'gba':
      return [FileType.Game, {platform: 'gba'}];
    case 'nds':
      return [FileType.Game, {platform: 'nds'}];
    case 'nes':
      return [FileType.Game, {platform: 'nes'}];
    case 'sfc':
    case 'smc':
      return [FileType.Game, {platform: 'snes'}];
    case 'psx':
      return [FileType.Game, {platform: 'psx'}];
    case 'gen':
    case 'smd':
      return [FileType.Game, {platform: 'segaMD'}];
    case 'sms':
      return [FileType.Game, {platform: 'segaMS'}];
    case 'gg':
      return [FileType.Game, {platform: 'segaGG'}];
    case 'scd':
      return [FileType.Game, {platform: 'segaCD'}];
    case '32x':
      return [FileType.Game, {platform: 'sega32x'}];
    case 'sat':
      return [FileType.Game, {platform: 'segaSaturn'}];
    case 'a78':
      return [FileType.Game, {platform: 'atari7800'}];
    case 'a26':
      return [FileType.Game, {platform: 'atari2600'}];
    case 'jag':
    case 'j64':
      return [FileType.Game, {platform: 'jaguar'}];
    case 'lnx':
      return [FileType.Game, {platform: 'lynx'}];
    case 'pce':
      return [FileType.Game, {platform: 'pce'}];
    case 'pcfx':
      return [FileType.Game, {platform: 'pcfx'}];
    case 'ngp':
      return [FileType.Game, {platform: 'ngp'}];
    case 'vb':
      return [FileType.Game, {platform: 'vb'}];
    case 'ws':
    case 'wsc':
      return [FileType.Game, {platform: 'ws'}];
    case 'col':
      return [FileType.Game, {platform: 'coleco'}];
    case 'd64':
    case 't64':
    case 'prg':
      return [FileType.Game, {platform: 'vice_x64'}];
    default:
      return [FileType.Binary, {}];
  }
}

export async function getFileBlob(path: string, mimetype: string) {
  // IPFS
  if (path.startsWith('ipfs://')) {
    const response = await fetchIPFS(path);
    return await response.blob();
  }

  // HTTP
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const response = await fetch(path);
    return await response.blob();
  }

  // OPFS
  const hfs = await fs.init();
  const bytes = await hfs.bytes?.(path);
  if (!bytes) return;
  return new Blob([bytes], {type: mimetype});
}

export async function getFileText(path: string) {
  // IPFS
  if (path.startsWith('ipfs://')) {
    const response = await fetchIPFS(path);
    return await response.text();
  }

  // HTTP
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const response = await fetch(path);
    return await response.text();
  }

  // OPFS
  const hfs = await fs.init();
  const bytes = await hfs.bytes?.(path);
  if (!bytes) return;
  return new TextDecoder('utf-8').decode(bytes);
}
