export interface Zip {
  date: {
    created?: Date,
    modified?: Date,
    accessed?: Date,
  },
  size: {
    compressed: number,
    uncompressed: number,
  },
  list: Array<{
    id: number,
    name: string,
    size: number,
    ext: string,
    dir: boolean,
  }>,
}

export type ZipCtx = {
  zip: Zip | null,
  cmd: ZipCmd,
};

export type ZipCmd = {
  extract: (entry: ZipFileEntry) => void,
};

export type ZipFileEntry = Zip['list'][number];
