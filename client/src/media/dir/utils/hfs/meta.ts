import {web} from 'react-exo/fs';
import {FileType} from 'media/file/types';
import {getRenderer} from 'media/file/utils/render';
import {toPathInfo} from 'app/utils/formatting';

import type {HfsDirectoryEntry} from 'react-exo/fs';

const THUMB_MAX_SIZE = 320;

export async function getThumbnail(path: string, item: HfsDirectoryEntry) {
  if (item.isDirectory) return null;
  // Resolve path
  const uri = path ? `${path}/${item.name}` : item.name;
  // Check if file is image
  const info = toPathInfo(item.name, false);
  const [type] = await getRenderer(info.ext, uri);
  if (type !== FileType.Image) return null;
  // Get image
  const handle = await web.getFileHandle(uri);
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
