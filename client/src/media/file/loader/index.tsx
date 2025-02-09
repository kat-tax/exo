import {lazy} from 'react';
import {FileType} from 'media/file/types';

export const loader: {[key in FileType]: ReturnType<typeof lazy>} = {
  [FileType.Directory]: lazy(
    () => import('../file-directory')
  ),
  [FileType.Binary]: lazy(
    () => import('../file-binary')
  ),
  [FileType.Text]: lazy(
    () => import('../file-text')
  ),
  [FileType.Document]: lazy(
    () => import('../file-doc')
  ),
  [FileType.Presentation]: lazy(
    () => import('../file-presentation')
  ),
  [FileType.Spreadsheet]: lazy(
    () => import('../file-spreadsheet')
  ),
  [FileType.Markdown]: lazy(
    () => import('../file-markdown')
  ),
  [FileType.Typst]: lazy(
    () => import('../file-typst')
  ),
  [FileType.Audio]: lazy(
    () => import('../file-audio')
  ),
  [FileType.Video]: lazy(
    () => import('../file-video')
  ),
  [FileType.Image]: lazy(
    () => import('../file-image')
  ),
  [FileType.Model]: lazy(
    () => import('../file-model')
  ),
  [FileType.Lottie]: lazy(
    () => import('../file-lottie')
  ),
  [FileType.Rive]: lazy(
    () => import('../file-rive')
  ),
  [FileType.Game]: lazy(
    () => import('../file-game')
  ),
  [FileType.Book]: lazy(
    () => import('../file-book')
  ),
  [FileType.Pdf]: lazy(
    () => import('../file-pdf')
  ),
  [FileType.Map]: lazy(
    () => import('../file-map')
  ),
  [FileType.Torrent]: lazy(
    () => import('../file-torrent')
  ),
  [FileType.Zip]: lazy(
    () => import('../file-zip')
  ),
}

export default loader
