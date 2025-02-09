import type {FileGame} from 'media/file/file-game';
import type {FileText} from 'media/file/file-text';

import type {ImageRef} from 'media/file/file-image';
import type {VideoRef} from 'media/file/file-video';
import type {PdfRef} from 'media/file/file-pdf';
import type {BookRef} from 'media/file/file-book';
import type {RiveRef} from 'media/file/file-rive';
import type {GameRef} from 'media/file/file-game';

export enum FileType {
  Directory = 'Directory',
  Binary = 'Binary',
  Text = 'Text',
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
  [FileType.Text]: {language: FileText['language']},
  [FileType.Game]: {platform: FileGame['platform']},
} & Record<FileType, Record<string, unknown>>

export type FileRef =
  | ImageRef
  | VideoRef
  | PdfRef
  | BookRef
  | RiveRef
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
