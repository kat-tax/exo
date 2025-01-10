import {FileType} from 'media/file/types';

export const loader: {[key in FileType]: JSX.Element} = {
  get [FileType.Binary]() {
    return require('../FileBinary').default
  },
  get [FileType.Text]() {
    return require('../FileText').default
  },
  get [FileType.Document]() {
    return require('../FileDoc').default
  },
  get [FileType.Spreadsheet]() {
    return require('../FileSpreadsheet').default
  },
  get [FileType.Presentation]() {
    return require('../FilePresentation').default
  },
  get [FileType.Markdown]() {
    return require('../FileMarkdown').default
  },
  get [FileType.Typst]() {
    return require('../FileTypst').default
  },
  get [FileType.Audio]() {
    return require('../FileAudio').default
  },
  get [FileType.Video]() {
    return require('../FileVideo').default
  },
  get [FileType.Image]() {
    return require('../FileImage').default
  },
  get [FileType.Model]() {
    return require('../FileModel').default
  },
  get [FileType.Lottie]() {
    return require('../FileLottie').default
  },
  get [FileType.Rive]() {
    return require('../FileRive').default
  },
  get [FileType.Game]() {
    return require('../FileGame').default
  },
  get [FileType.Book]() {
    return require('../FileBook').default
  },
  get [FileType.Pdf]() {
    return require('../FilePdf').default
  },
  get [FileType.Map]() {
    return require('../FileMap').default
  },
  get [FileType.Torrent]() {
    return require('../FileTorrent').default
  },
  get [FileType.Zip]() {
    return require('../FileZip').default
  },
}

export default loader
