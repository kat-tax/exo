import {isTextFile} from 'react-exo/fs';
import {FileType, FileRenderInfo} from '../types';
import {getData} from './data';

export async function detectUnknown(
  extension: string,
  path?: string,
): Promise<FileRenderInfo> {
  if (!path) return [FileType.Binary, {}];
  const buffer = await getData(path, 'arrayBuffer');
  return await isTextFile(extension, buffer)
    ? [FileType.Text, {language: 'text'}]
    : [FileType.Binary, {}];
}
