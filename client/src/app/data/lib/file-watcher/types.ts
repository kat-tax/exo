import type evolu from '../evolu.db';

export type EvoluInstance = typeof evolu;

export type PathTuple = [
  name: string,
  parentId: string | undefined,
  fileId: string | undefined,
];

export type FileTuple = [
  size: number,
  mimetype: string,
  thumbnail: Uint8Array | undefined,
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

export interface StatsData {
  totals: {
    entries: number;
    hashing: number;
    indexing: number;
    generating: number;
  };
}

export type WorkerMessage =
  | {type: 'init'; deviceId: string; rootHandle: FileSystemDirectoryHandle}
  | {type: 'stop'}
  | {type: 'get-snapshot'};

export type WorkerResponse =
  | {type: 'ready'}
  | {type: 'error'; message: string}
  | {type: 'snapshot'; data: SnapshotData}
  | {type: 'delta'; data: DeltaUpdate}
  | {type: 'stats'; data: StatsData};
