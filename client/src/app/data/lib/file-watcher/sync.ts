import * as $ from '../../types';
import {getFiles, getPathsForDevice} from 'app/data/queries';

import type {DeviceId, PathId, FileId} from '../../types';
import type {SnapshotData, DeltaUpdate, EvoluInstance, PathTuple, FileTuple} from './types';

export async function syncSnapshot(
  evolu: EvoluInstance,
  deviceId: DeviceId,
  snapshot: SnapshotData,
) {
  console.log(`Syncing snapshot: ${Object.keys(snapshot.paths).length} paths, ${Object.keys(snapshot.files).length} files`);

  const existingPaths = await loadExistingPaths(evolu, deviceId);
  const existingFiles = await loadExistingFiles(evolu);

  const pathsToRemove: Array<PathId> = [];
  const pathsToUpsert: Array<[PathId, PathTuple]> = [];
  const filesToUpsert: Array<[FileId, FileTuple]> = [];

  // Process paths
  for (const [pathId, pathData] of Object.entries(snapshot.paths)) {
    const typedPathId = $.PathId.from(pathId);
    if (!typedPathId.ok) continue;
    const existing = existingPaths.get(pathId);
    if (!existing || pathsNeedUpdate(existing, pathData))
      pathsToUpsert.push([typedPathId.value, pathData]);
    existingPaths.delete(pathId);
  }

  // Remaining paths should be removed
  for (const pathId of existingPaths.keys()) {
    const typedPathId = $.PathId.from(pathId);
    if (typedPathId.ok) pathsToRemove.push(typedPathId.value);
  }

  // Process files
  for (const [fileId, fileData] of Object.entries(snapshot.files)) {
    const typedFileId = $.FileId.from(fileId);
    if (!typedFileId.ok) continue;
    const existing = existingFiles.get(fileId);
    if (!existing || filesNeedUpdate(existing, fileData)) {
      filesToUpsert.push([typedFileId.value, fileData]);
    }
  }

  // Apply changes
  for (const [pathId, [name, parentId, fileId]] of pathsToUpsert)
    evolu.upsert('path', {id: pathId, name, deviceId, parentId, fileId});
  for (const pathId of pathsToRemove)
    evolu.update('path', {id: pathId, isDeleted: 1});
  for (const [fileId, [size, mime, thumb]] of filesToUpsert)
    evolu.upsert('file', {id: fileId, size, mime, thumb});

  // Debug log
  console.log('Snapshot sync complete');
  console.table({
    'Paths': {'Upsert': pathsToUpsert.length, 'Remove': pathsToRemove.length},
    'Files': {'Upsert': filesToUpsert.length},
  });
}

/**
 * Applies a delta update to the Evolu database
 */
export function applyDelta(
  evolu: EvoluInstance,
  deviceId: DeviceId,
  delta: DeltaUpdate,
) {
  if (!delta.path && delta.type !== 'disappeared') return;
  switch (delta.type) {
    case 'appeared':
    case 'modified':
      upsertPathAndFile(evolu, deviceId, delta.pathId, delta.path!, delta.file);
      break;
    case 'disappeared':
      evolu.update('path', {id: delta.pathId, isDeleted: 1});
      break;
    case 'moved':
      if (delta.movedFrom) evolu.update('path', {id: delta.movedFrom, isDeleted: 1});
      upsertPathAndFile(evolu, deviceId, delta.pathId, delta.path!, delta.file);
      break;
  }
}

async function loadExistingPaths(
  evolu: EvoluInstance,
  deviceId: DeviceId,
): Promise<Map<string, PathTuple>> {
  const res = await evolu.loadQuery(getPathsForDevice(deviceId));
  const map = new Map<string, PathTuple>();
  for (const row of res) {
    if (row.id && row.name) {
      map.set(row.id, [row.name, row.parentId || undefined, row.fileId || undefined]);
    }
  }
  return map;
}

async function loadExistingFiles(
  evolu: EvoluInstance,
): Promise<Map<string, FileTuple>> {
  const res = await evolu.loadQuery(getFiles);
  const map = new Map<string, FileTuple>();
  for (const row of res) {
    if (row.id && row.size !== null && row.mime) {
      map.set(row.id, [row.size, row.mime, row.thumb || undefined]);
    }
  }
  return map;
}

function upsertPathAndFile(
  evolu: EvoluInstance,
  deviceId: DeviceId,
  pathId: string,
  path: PathTuple,
  file?: FileTuple,
) {
  const [name, parentId, fileId] = path;
  evolu.upsert('path', {id: pathId, name, deviceId, parentId, fileId});
  if (file && fileId) {
    const [size, mime, thumb] = file;
    evolu.upsert('file', {id: fileId, size, mime, thumb});
  }
}

function pathsNeedUpdate(existing: PathTuple, current: PathTuple) {
  return existing[0] !== current[0]
    || existing[1] !== current[1]
    || existing[2] !== current[2];
}

function filesNeedUpdate(existing: FileTuple, current: FileTuple) {
  return existing[0] !== current[0]
    || existing[1] !== current[1];
}
