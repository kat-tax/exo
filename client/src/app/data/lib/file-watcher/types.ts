import type evolu from '../evolu.db';

export type EvoluInstance = typeof evolu;

export type PathTuple = [
  name: string,
  parentId: string | null,
  fileId: string | null,
];

export type FileTuple = [
  size: number,
  filetype: string,
  thumbnail: Uint8Array | null,
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
  movedFrom?: string;
}

export type WorkerMessage =
  | {type: 'init'}
  | {type: 'stop'}
  | {type: 'get-snapshot'};

export type WorkerResponse =
  | {type: 'ready'}
  | {type: 'error'; message: string}
  | {type: 'snapshot'; data: SnapshotData}
  | {type: 'delta'; data: DeltaUpdate};
