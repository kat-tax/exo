import {web} from 'react-exo/fs';
import {FileType} from 'media/file/types';
import {getRenderer} from 'media/file/utils/render';
import {toPath} from 'app/lib/formatting';

import type {HfsFileEntry} from 'media/dir/types/hfs';
import type {GameProps} from 'react-exo/game';

const THUMB_MAX_SIZE = 320;
const GAME_ART_SOURCE = 'https://thumbnails.libretro.com';

export async function getThumbnail(path: string, item: HfsFileEntry) {
  if (item.isDirectory) return null;

  const url = path ? `${path}/${item.name}` : item.name;
  const info = toPath(item.name, false);
  const [type, renderer] = await getRenderer(info.ext, url);

  switch (type) {
    case FileType.Image:
      return getCroppedImage(url);
    // case FileType.Game:
    //   return getGameBoxArt(renderer.platform, info.name);
    default:
      return null;
  }
}

export async function getCroppedImage(url: string) {
  // Get image
  const handle = await web.getFileHandle(url);
  if (!handle) return null;
  const file = await handle.getFile();
  if (!file?.type?.startsWith('image/')) return null;
  // Resize image
  const image = new Image();
  image.src = URL.createObjectURL(file);
  await new Promise(resolve => {image.onload = resolve});
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const scale = Math.min(THUMB_MAX_SIZE / image.width, THUMB_MAX_SIZE / image.height);
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}

export async function getGameBoxArt(platform: GameProps['platform'], name: string) {
  let _platform: string | undefined;
  switch (platform) {
    case 'gb':
      _platform = 'Nintendo - Game Boy Color';
      break;
    // default: platform satisfies never;
  }
  if (_platform === undefined) return null;
  return `${GAME_ART_SOURCE}/${_platform}/Named_Boxarts/${name}.png`;
}
