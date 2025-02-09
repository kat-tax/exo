import {FS} from 'react-exo/fs';
import {fetchIpfs} from 'media/dir/utils/ipfs/fetch';
import {toText} from 'app/utils/formatting';

import type {FileData, FileFormat, FileProtocol, FileTransfer} from '../types';

export async function getData<T extends FileFormat>(
  path: string,
  format: T,
  type?: string,
): Promise<FileData<T> | undefined> {
  const protocol = getProtocol(path);
  const $ = await getTransfer(path, protocol);

  // Remote (fetch)
  if ($ instanceof Response) {
    switch (format) {
      case 'arrayBuffer':
        return await $.arrayBuffer() as FileData<T>;
      case 'dataUrl':
        if (protocol === 'http' || protocol === 'https')
          return path as FileData<T>;
        return URL.createObjectURL(await $.blob()) as FileData<T>;
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
      return $ ? URL.createObjectURL(new Blob([$], {type})) as FileData<T> : undefined;
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
  protocol: FileProtocol,
): Promise<FileTransfer | undefined> {
  switch (protocol) {
    case 'fs':
      return (await FS.init()).bytes?.(path);
    case 'ipfs':
      return fetchIpfs(path);
    case 'http':
    case 'https':
      return fetch(path);
    default: protocol satisfies never;
  }
}

export function getProtocol(path: string): FileProtocol {
  let protocol: FileProtocol = 'fs';
  try {protocol = new URL(path).protocol.slice(0, -1) as FileProtocol} catch (e) {}
  return protocol;
}
