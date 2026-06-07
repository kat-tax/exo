import type {DeviceId} from 'app/data/types';
import type {FileType} from 'media/file/types';
import type evolu from '../evolu.db';

export type EvoluInstance = typeof evolu;

export type PathTuple = [
  name: string,
  parentId: string | null,
  fileId: string | null,
];

export type FileTuple = [
  size: number,
  type: FileType,
  thumb?: Uint8Array | null,
];

export interface SnapshotData {
  paths: PathSnapshot;
  files: FileSnapshot;
}

export interface PathSnapshot {
  [pathId: string]: PathTuple;
}

export interface FileSnapshot {
  [fileId: string]: FileTuple;
}

export interface DeltaUpdate {
  type: 'appeared' | 'disappeared' | 'modified' | 'moved';
  pathId: string;
  path?: PathTuple;
  file?: FileTuple;
  fileId?: string;
  movedFrom?: string;
}

export type WorkerMessage =
  | {type: 'init'; deviceId: DeviceId}
  | {type: 'stop'}
  | {type: 'debrief'}

export type WorkerResponse =
  | {type: 'ready', snapshot: SnapshotData}
  | {type: 'error'; message: string}
  | {type: 'delta'; data: DeltaUpdate}
  | {type: 'paths'; paths: string[]}
