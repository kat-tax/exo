import {FileType} from 'media/file/types';

export const loader: {[key in FileType]: JSX.Element} = {
  get [FileType.Directory]() {
    return require('../file-directory').default
  },
  get [FileType.Binary]() {
    return require('../file-binary').default
  },
  get [FileType.Text]() {
    return require('../file-text').default
  },
  get [FileType.Document]() {
    return require('../file-doc').default
  },
  get [FileType.Spreadsheet]() {
    return require('../file-spreadsheet').default
  },
  get [FileType.Presentation]() {
    return require('../file-presentation').default
  },
  get [FileType.Markdown]() {
    return require('../file-markdown').default
  },
  get [FileType.Typst]() {
    return require('../file-typst').default
  },
  get [FileType.Audio]() {
    return require('../file-audio').default
  },
  get [FileType.Video]() {
    return require('../file-video').default
  },
  get [FileType.Image]() {
    return require('../file-image').default
  },
  get [FileType.Model]() {
    return require('../file-model').default
  },
  get [FileType.Lottie]() {
    return require('../file-lottie').default
  },
  get [FileType.Rive]() {
    return require('../file-rive').default
  },
  get [FileType.Game]() {
    return require('../file-game').default
  },
  get [FileType.Book]() {
    return require('../file-book').default
  },
  get [FileType.Pdf]() {  
    return require('../file-pdf').default
  },
  get [FileType.Map]() {
    return require('../file-map').default
  },
  get [FileType.Torrent]() {
    return require('../file-torrent').default
  },
  get [FileType.Zip]() {
    return require('../file-zip').default
  },
}

export default loader
