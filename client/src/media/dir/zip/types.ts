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
