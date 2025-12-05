import {FS} from 'react-exo/fs';
import {toText} from 'app/lib/formatting';
import {device} from 'app/data/lib/device';
import {getPathById, getPathHierarchyByFileId} from 'app/data/queries';
import {DeviceId, PathId} from 'app/data/types';
import {evolu, createIdFromString} from 'app/data';
import {getPathInfo} from 'media/dir/utils/path';
import {IPFS} from 'media/dir/utils/ipfs/fetch';

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
      return (await IPFS.init()).fetch(path);
    case 'http':
    case 'https':
      return fetch(path);
    default: protocol satisfies never;
  }
}

export async function findPathInfo(path: string): Promise<{
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
      return {protocol, ...getPathInfo(parts.at(-1) ?? '', isDir)};
    }
    case 'evolu': {
      const {deviceId, pathId} = parseEvoluPath(path);
      const [data] = await evolu.loadQuery(getPathById(deviceId, pathId));
      const isDir = pathId === null ||data?.fileId === null;
      return {protocol, ...getPathInfo(data?.name ?? '', isDir)};
    }
    case 'ipfs': {
      const [_cid, name] = path.replace('ipfs://', '').split('/');
      return {protocol, ...getPathInfo(name)};
    }
    case 'http':
    case 'https': {
      const parts = path.replace(`${protocol}://`, '').split('/');
      const name = parts.at(-1) ?? '';
      return {protocol, ...getPathInfo(name)};
    }
    default: protocol satisfies never;
    console.error(`Unknown protocol: ${protocol}`);
    return {protocol, ...getPathInfo('')};
  }
}

export async function fetchEvolu(path: string): Promise<FileTransfer | undefined> {
  // Lookup file id from path
  const {deviceId: sourceDeviceId, pathId} = parseEvoluPath(path);
  const [pathData] = await evolu.loadQuery(getPathById(sourceDeviceId, pathId));
  const fileId = pathData?.fileId;
  if (!fileId) {
    return undefined;
  }

  // Check if file exists anywhere on local device
  const hierarchy = await evolu.loadQuery(getPathHierarchyByFileId(device.id, fileId));

  // Condition 1: file exists on current device (read from local disk)
  if (hierarchy.length > 0) {
    const pathSegments = [...hierarchy].reverse().map(p => p.name).filter(Boolean);
    const fullPath = pathSegments.join('/');
    const fs = await FS.init();
    return fs.bytes?.(fullPath);
  }

  // Condition 2: file does not exist on current device (create transfer request)
  const id = createIdFromString(`${fileId}-${device.id}`);
  const transfer = evolu.upsert('media_transfer', {
    id,
    fileId,
    status: 'active',
    recipientId: device.id,
  });

  // This should never happen
  if (!transfer.ok) {
    console.error(`[evolu-fetch] failed to create transfer request:`, transfer.error);
    return undefined;
  }

  // TODO: implement device to device file transfers
  // For remote, we should do the following:
  // 1. Create a transfer request (done above)
  // 2. Other devices with file update with a infoHash from created torrent
  // 3. Download via webtorrent
  return new Response(new Blob([`Transfer request created for file ${fileId} from device ${sourceDeviceId}.`]), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
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
