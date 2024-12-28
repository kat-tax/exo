import type {FileGame} from 'media/file/FileGame';
import type {ImageRef} from 'media/file/FileImage';
import type {VideoRef} from 'media/file/FileVideo';
import type {RiveRef} from 'media/file/FileRive';
import type {BookRef} from 'media/file/FileBook';
import type {GameRef} from 'media/file/FileGame';

export enum FileType {
  Binary = 'Binary',
  Text = 'Text',
  Code = 'Code',
  Note = 'Note',
  Torrent = 'Torrent',
  Document = 'Document',
  Spreadsheet = 'Spreadsheet',
  Presentation = 'Presentation',
  Markdown = 'Markdown',
  Typst = 'Typst',
  Audio = 'Audio',
  Video = 'Video',
  Image = 'Image',
  Model = 'Model',
  Lottie = 'Lottie',
  Rive = 'Rive',
  Game = 'Game',
  Book = 'Book',
  Pdf = 'Pdf',
  Map = 'Map',
  Zip = 'Zip',
}

export type FileOptions = {
  [FileType.Book]: {continuous: boolean},
  [FileType.Game]: {platform: FileGame['platform']},
} & Record<FileType, Record<string, unknown>>

export type FileRef =
  | ImageRef
  | VideoRef
  | RiveRef
  | BookRef
  | GameRef

export type FileProtocol =
  | 'fs'
  | 'ipfs'
  | 'http'
  | 'https'

export type FileFormat =
  | 'arrayBuffer'
  | 'dataUrl'
  | 'blob'
  | 'text'
  | 'json'

export type FileData<Id extends FileFormat> =
    Id extends 'arrayBuffer' ? ArrayBuffer
  : Id extends 'dataUrl' ? string
  : Id extends 'blob' ? Blob
  : Id extends 'text' ? string
  : Id extends 'json' ? Record<string, unknown>
  : never

export type FileTransfer =
  | Response
  | Uint8Array

export type FileRenderInfo = {
  [T in FileType]: [T, FileOptions[T & keyof FileOptions]]
}[FileType]
