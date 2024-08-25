import {fs, isTextFile} from 'react-exo/fs';
import {fetchIpfs} from 'media/utils/ipfs';
import {FileType} from 'media/file/types';
import {toText} from 'app/utils/formatting';

import type {
  FileData,
  FileFormat,
  FileProtocol,
  FileTransfer,
  FileRenderInfo,
} from 'media/file/types';

export async function getData<T extends FileFormat>(
  path: string,
  format: T,
  type?: string,
): Promise<FileData<T> | undefined> {
  const $ = await getTransfer(path);

  // Remote (fetch)
  if ($ instanceof Response) {
    switch (format) {
      case 'arrayBuffer':
        return await $.arrayBuffer() as FileData<T>;
      case 'dataUrl':
      case 'blob':
        return await $.blob() as FileData<T>;
      case 'text':
        return await $.text() as FileData<T>;
      case 'json':
        return await $.json() as FileData<T>;
      default:
        return format satisfies never;
    }
  }

  // Local (humanfs)
  switch (format) {
    case 'arrayBuffer':
      return $?.buffer as FileData<T>;
    case 'dataUrl':
    case 'blob':
      return $ ? new Blob([$], {type}) as FileData<T> : undefined;
    case 'text':
      return $ ? toText($) as FileData<T> : undefined;
    case 'json':
      return $ ? JSON.parse(toText($)) as FileData<T> : undefined;
    default:
      return format satisfies never;
  }
}

export async function getTransfer(
  path: string,
): Promise<FileTransfer | undefined> {
  const {protocol} = new URL(path) as {protocol: FileProtocol};
  switch (protocol) {
    case 'fs':
      return (await fs.init()).bytes?.(path);
    case 'ipfs':
      return fetchIpfs(path);
    case 'http':
    case 'https':
      return fetch(path);
    default: protocol satisfies never;
  }
}

export function getRenderInfo(
  extension: string,
): FileRenderInfo {
  switch (extension) {
    // Torrents
    case 'torrent':
      return [FileType.Torrent, {}];
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
    // Audio
    case 'mp3':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'm4a':
    case 'opus':
    case 'amr':
    case 'wma':
    case 'aiff':
      return [FileType.Audio, {}];
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
    default: {
      // TODO: pass data to isTextFile to auto-detect utf-8 files
      // const isText = await isTextFile(ext, null);
      const isText = false;
      console.log(isTextFile);
      return [isText ? FileType.Text : FileType.Binary, {}];
    }
  }
}
