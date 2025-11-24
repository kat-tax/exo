import {FS} from 'react-exo/fs';
import {evolu} from 'app/data';
import {getPathById} from 'app/data/queries';
import {DeviceId, PathId} from 'app/data/types';
import {toText, toPathInfo} from 'app/lib/formatting';
import {fetchIpfs} from 'media/dir/utils/ipfs/fetch';
import {device} from 'app/data/lib/device';

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
      return $ ? URL.createObjectURL(new Blob([$ as BlobPart], {type})) as FileData<T> : undefined;
    case 'blob':
      return $ ? new Blob([$ as BlobPart], {type}) as FileData<T> : undefined;
    case 'text':
      return $ ? toText($) as FileData<T> : undefined;
    case 'json':
      return $ ? JSON.parse(toText($)) as FileData<T> : undefined;
    default:
      return format satisfies never;
  }
}

export function getProtocol(path: string): FileProtocol {
  let protocol: FileProtocol = 'file';
  try {protocol = new URL(path).protocol.slice(0, -1) as FileProtocol} catch (e) {}
  return protocol;
}

export async function getTransfer(
  path: string,
  protocol: FileProtocol,
): Promise<FileTransfer | undefined> {
  switch (protocol) {
    case 'file':
      return (await FS.init()).bytes?.(path.replace('file://', ''));
    case 'evolu':
      return fetchEvolu(path);
    case 'ipfs':
      return fetchIpfs(path);
    case 'http':
    case 'https':
      return fetch(path);
    default: protocol satisfies never;
  }
}

export async function getPathInfo(path: string): Promise<{
  protocol: FileProtocol,
  isDir: boolean,
  name: string,
  ext: string,
}> {
  const protocol = getProtocol(path);
  switch (protocol) {
    case 'file': {
      const fs = await FS.init();
      const uri = path.replace('file://', '');
      const isDir = Boolean(await fs?.isDirectory?.(uri || '.'));
      const parts = uri.split('/');
      return {protocol, ...toPathInfo(parts.at(-1) ?? '', isDir)};
    }
    case 'evolu': {
      const {deviceId, pathId} = parseEvoluPath(path);
      const [data] = await evolu.loadQuery(getPathById(deviceId, pathId));
      const isDir = data?.fileId === null;
      return {protocol, ...toPathInfo(data?.name ?? '', isDir)};
    }
    case 'ipfs': {
      const [_cid, name] = path.replace('ipfs://', '').split('/');
      return {protocol, ...toPathInfo(name)};
    }
    case 'http':
    case 'https': {
      const parts = path.replace(`${protocol}://`, '').split('/');
      const name = parts.at(-1) ?? '';
      return {protocol, ...toPathInfo(name)};
    }
    default: protocol satisfies never;
    console.error(`Unknown protocol: ${protocol}`);
    return {protocol, ...toPathInfo('')};
  }
}

export async function fetchEvolu(path: string): Promise<FileTransfer | undefined> {
  const {deviceId: sourceDeviceId, pathId} = parseEvoluPath(path);
  const [pathData] = await evolu.loadQuery(getPathById(sourceDeviceId, pathId));
  const fileId = pathData?.fileId;

  if (!fileId) {
    console.error(`[evolu-fetch] no file id found for path ${pathId} on device ${sourceDeviceId}`);
    return undefined;
  }

  const transfer = evolu.insert('media_transfer', {
    fileId,
    status: 'active',
    recipientId: device.id, // Current device is the recipient
  });

  if (!transfer.ok) {
    console.error(`[evolu-fetch] failed to create transfer request:`, transfer.error);
    return undefined;
  }

  return Promise.resolve(new Response(new Blob([`Transfer request created for file ${fileId} from device ${sourceDeviceId}.`]), {
    headers: {
      'Content-Type': 'text/plain',
    },
  }));
}

export function parseEvoluPath(path: string): {
  deviceId: DeviceId,
  pathId: PathId | null,
} {
  const parts = path.replace('evolu://', '').split('/');
  const _deviceId = DeviceId.from(parts[0]);
  const _pathId = PathId.from(parts[1]);
  return {
    deviceId: _deviceId.ok ? _deviceId.value : device.id,
    pathId: _pathId.ok ? _pathId.value : null,
  };
}
