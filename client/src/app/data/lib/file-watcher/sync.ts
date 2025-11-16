import * as $ from '../../types';
import {getFiles, getPathsForDevice} from 'app/data/queries';

import type {DeviceId, PathId, FileId} from '../../types';
import type {SnapshotData, DeltaUpdate} from './types';
import type evolu from '../evolu.db';

type EvoluInstance = typeof evolu;

/**
 * Syncs file watcher snapshot with Evolu database
 */
export async function syncSnapshot(
  evolu: EvoluInstance,
  deviceId: DeviceId,
  snapshot: SnapshotData,
) {
  console.log(`Syncing snapshot: ${Object.keys(snapshot.paths).length} paths, ${Object.keys(snapshot.files).length} files`);

  // Load existing paths and files from database
  const existingPaths = await loadExistingPaths(evolu, deviceId);
  const existingFiles = await loadExistingFiles(evolu);

  // Determine what needs to be added, updated, or removed
  const pathsToAdd: Array<[PathId, [string, string | undefined, string | undefined]]> = [];
  const pathsToUpdate: Array<[PathId, [string, string | undefined, string | undefined]]> = [];
  const pathsToRemove: PathId[] = [];
  const filesToAdd: Array<[FileId, [number, string, Uint8Array | undefined]]> = [];
  const filesToUpdate: Array<[FileId, [number, string, Uint8Array | undefined]]> = [];

  // Process paths
  for (const [pathId, pathData] of Object.entries(snapshot.paths)) {
    const typedPathId = $.PathId.from(pathId);
    if (!typedPathId.ok) continue;
    if (existingPaths.has(pathId)) {
      // Check if needs update
      const existing = existingPaths.get(pathId)!;
      if (
        existing[0] !== pathData[0] ||
        existing[1] !== pathData[1] ||
        existing[2] !== pathData[2]
      ) {
        pathsToUpdate.push([typedPathId.value, pathData]);
      }
      existingPaths.delete(pathId);
    } else {
      pathsToAdd.push([typedPathId.value, pathData]);
    }
  }

  // Remaining existing paths should be removed (soft delete)
  for (const pathId of existingPaths.keys()) {
    const typedPathId = $.PathId.from(pathId);
    if (typedPathId.ok) {
      pathsToRemove.push(typedPathId.value);
    }
  }

  // Process files
  for (const [fileId, fileData] of Object.entries(snapshot.files)) {
    const typedFileId = $.FileId.from(fileId);
    if (!typedFileId.ok) continue;
    if (existingFiles.has(fileId)) {
      // Check if needs update
      const existing = existingFiles.get(fileId)!;
      if (existing[0] !== fileData[0] || existing[1] !== fileData[1]) {
        filesToUpdate.push([typedFileId.value, fileData]);
      }
    } else {
      filesToAdd.push([typedFileId.value, fileData]);
    }
  }

  // Apply changes to database
  console.table({
    'Paths': {
      'Add': pathsToAdd.length,
      'Update': pathsToUpdate.length,
      'Remove': pathsToRemove.length,
    },
    'Files': {
      'Add': filesToAdd.length,
      'Update': filesToUpdate.length,
    },
  });

  // Upsert paths (add or update)
  for (const [pathId, [name, parentId, fileId]] of [...pathsToAdd, ...pathsToUpdate]) {
    evolu.upsert('path', {
      id: pathId,
      name,
      deviceId,
      parentId,
      fileId,
    });
  }

  // Remove paths (soft delete)
  for (const pathId of pathsToRemove) {
    evolu.update('path', {
      id: pathId,
      isDeleted: 1,
    });
  }

  // Upsert files (add or update)
  for (const [fileId, [size, mime, thumb]] of [...filesToAdd, ...filesToUpdate]) {
    evolu.upsert('file', {
      id: fileId,
      size,
      mime,
      thumb,
    });
  }

  console.log('Snapshot sync complete');
}

/**
 * Applies a delta update to the Evolu database
 */
export function applyDelta(
  evolu: EvoluInstance,
  deviceId: DeviceId,
  delta: DeltaUpdate,
) {
  switch (delta.type) {
    case 'appeared': {
      if (!delta.path) break;
      const [name, parentId, fileId] = delta.path;
      // Upsert path
      evolu.upsert('path', {
        id: delta.pathId,
        name,
        deviceId,
        parentId,
        fileId
      });
      // Upsert file if present
      if (delta.file && fileId) {
        const [size, mime, thumb] = delta.file;
        evolu.upsert('file', {
          id: fileId,
          size,
          mime,
          thumb,
        });
      }
      break;
    }

    case 'disappeared': {
      // Soft delete path
      evolu.update('path', {
        id: delta.pathId,
        isDeleted: 1,
      });
      break;
    }

    case 'modified': {
      if (!delta.path) break;
      const [name, parentId, fileId] = delta.path;
      // Upsert path
      evolu.upsert('path', {
        id: delta.pathId,
        name,
        deviceId,
        parentId,
        fileId,
      });
      // Upsert file if present
      if (delta.file && fileId) {
        const [size, mime, thumb] = delta.file;
        evolu.upsert('file', {
          id: fileId,
          size,
          mime,
          thumb,
        });
      }
      break;
    }

    case 'moved': {
      if (!delta.path) break;
      const [name, parentId, fileId] = delta.path;
      // Delete old path
      if (delta.movedFrom) {
        evolu.update('path', {
          id: delta.movedFrom,
          isDeleted: 1,
        });
      }
      // Upsert new path
      evolu.upsert('path', {
        id: delta.pathId,
        name,
        deviceId,
        parentId,
        fileId,
      });
      break;
    }
  }
}

/**
 * Loads existing paths from database
 */
async function loadExistingPaths(
  evolu: EvoluInstance,
  deviceId: DeviceId,
): Promise<Map<string, [string, string | undefined, string | undefined]>> {
  const result = await evolu.loadQuery(getPathsForDevice(deviceId));
  const map = new Map<string, [string, string | undefined, string | undefined]>();
  for (const row of result) {
    if (row.id && row.name) {
      map.set(row.id, [
        row.name,
        row.parentId || undefined,
        row.fileId || undefined,
      ]);
    }
  }
  return map;
}

/**
 * Loads existing files from database
 */
async function loadExistingFiles(
  evolu: EvoluInstance,
): Promise<Map<string, [number, string, Uint8Array | undefined]>> {
  const result = await evolu.loadQuery(getFiles);
  const map = new Map<string, [number, string, Uint8Array | undefined]>();
  for (const row of result) {
    if (row.id && row.size !== null && row.mime) {
      map.set(row.id, [
        row.size,
        row.mime,
        row.thumb || undefined,
      ]);
    }
  }
  return map;
}
