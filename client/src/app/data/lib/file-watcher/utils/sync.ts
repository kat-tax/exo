import * as $ from 'app/data/types';
import {getFiles, getPathsForDevice} from 'app/data/queries';

import type {FileType} from 'media/file/types';
import type {DeviceId, PathId, FileId} from 'app/data/types';
import type {SnapshotData, DeltaUpdate, EvoluInstance, PathTuple, FileTuple} from '../types';

export async function syncSnapshot(
  evolu: EvoluInstance,
  deviceId: DeviceId,
  snapshot: SnapshotData,
) {
  console.log(`[fs-watcher] syncing snapshot: ${Object.keys(snapshot.paths).length} paths, ${Object.keys(snapshot.files).length} files`);

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
  for (const [id, [name, parentId, fileId]] of pathsToUpsert) {
    const res = evolu.upsert('media_path', {id, name, deviceId, parentId, fileId, isDeleted: 0});
    console.log('[fs-watcher] upsert path:', id, name, res);
  }
  for (const id of pathsToRemove) {
    const res = evolu.update('media_path', {id, isDeleted: 1});
    console.log('[fs-watcher] remove path:', id, res);
  }
  for (const [id, [size, type, thumb]] of filesToUpsert) {
    const res = evolu.upsert('media_file', {id, size, type, thumb: thumb || null});
    console.log('[fs-watcher] upsert file:', id, res);
  }

  // Debug log
  console.log('[fs-watcher] snapshot sync complete', {
    paths: {
      upsert: pathsToUpsert.length,
      remove: pathsToRemove.length,
    },
    files: {
      upsert: filesToUpsert.length,
    },
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
  // Handle metadata updates
  if (delta.fileId && delta.file && !delta.path) {
    const [,,thumb] = delta.file;
    evolu.update('media_file', {id: delta.fileId, thumb});
    return;
  }
  if (!delta.path && delta.type !== 'disappeared') return;
  switch (delta.type) {
    case 'appeared':
    case 'modified':
      upsertPathAndFile(evolu, deviceId, delta.pathId, delta.path!, delta.file);
      break;
    case 'disappeared':
      evolu.update('media_path', {id: delta.pathId, isDeleted: 1});
      break;
    case 'moved':
      if (delta.movedFrom) evolu.update('media_path', {id: delta.movedFrom, isDeleted: 1});
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
      map.set(row.id, [row.name, row.parentId || null, row.fileId || null]);
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
    if (row.id && row.size !== null && row.type) {
      map.set(row.id, [row.size, row.type as FileType, row.thumb || null]);
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
  evolu.upsert('media_path', {id: pathId, name, deviceId, parentId, fileId, isDeleted: 0});
  if (file && fileId) {
    const [size, type, thumb] = file;
    evolu.upsert('media_file', {id: fileId, size, type, thumb: thumb || null});
  }
}

function pathsNeedUpdate(existing: PathTuple, current: PathTuple) {
  return existing[0] !== current[0]
    || existing[1] !== current[1]
    || existing[2] !== current[2];
}

function filesNeedUpdate(existing: FileTuple, current: FileTuple) {
  return existing[0] !== current[0]
    || existing[1] !== current[1]
    || (current[2] && existing[2] !== current[2]);
}
