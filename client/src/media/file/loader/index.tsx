import {lazy} from 'react';
import {FileType} from 'media/file/types';

export const loader: {[key in FileType]: ReturnType<typeof lazy>} = {
  [FileType.Binary]: lazy(
    () => import('../FileBinary')
  ),
  [FileType.Text]: lazy(
    () => import('../FileText')
  ),
  [FileType.Note]: lazy(
    () => import('../FileNote')
  ),
  [FileType.Document]: lazy(
    () => import('../FileDoc')
  ),
  [FileType.Presentation]: lazy(
    () => import('../FilePresentation')
  ),
  [FileType.Spreadsheet]: lazy(
    () => import('../FileSpreadsheet')
  ),
  [FileType.Markdown]: lazy(
    () => import('../FileMarkdown')
  ),
  [FileType.Typst]: lazy(
    () => import('../FileTypst')
  ),
  [FileType.Audio]: lazy(
    () => import('../FileAudio')
  ),
  [FileType.Video]: lazy(
    () => import('../FileVideo')
  ),
  [FileType.Image]: lazy(
    () => import('../FileImage')
  ),
  [FileType.Model]: lazy(
    () => import('../FileModel')
  ),
  [FileType.Lottie]: lazy(
    () => import('../FileLottie')
  ),
  [FileType.Rive]: lazy(
    () => import('../FileRive')
  ),
  [FileType.Game]: lazy(
    () => import('../FileGame')
  ),
  [FileType.Book]: lazy(
    () => import('../FileBook')
  ),
  [FileType.Pdf]: lazy(
    () => import('../FilePdf')
  ),
  [FileType.Map]: lazy(
    () => import('../FileMap')
  ),
  [FileType.Torrent]: lazy(
    () => import('../FileTorrent')
  ),
  [FileType.Zip]: lazy(
    () => import('../FileZip')
  ),
}

export default loader
