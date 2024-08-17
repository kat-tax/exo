import {useMemo, forwardRef, memo} from 'react';
import {Suspense as $} from 'app/stacks/Suspense';
import {FileType} from 'media/utils/file';
import {resolve} from 'media/utils/path';
import Renderer from './loader';

import type {FileData} from 'media/utils/file';
import type {VideoRef} from 'media/file/FileVideo';
import type {RiveRef} from 'media/file/FileRive';
import type {BookRef} from 'media/file/FileBook';

export interface FileProps {
  path: string,
  fileData?: FileData,
  maximized: boolean,
  close: () => void,
  setBarIcon: (icon: string) => void,
  setBarTitle: (title: string) => void,
}

export type FileRef = VideoRef | RiveRef | BookRef;

export default memo(forwardRef((props: FileProps, ref) => {
  const {maximized, fileData, setBarTitle, setBarIcon} = props;
  const [file, ctx] = fileData || [];
  return useMemo(() => {
    const parts = resolve(props.path || '');
    const path = parts.join('/');
    const name = parts.pop() || '';
    const extension = name?.split('.').pop() || '';
    const meta = {ref, name, extension, path, maximized, setBarIcon, setBarTitle};
    if (!file) return null;
    switch (file) {
      case FileType.Binary:
        return <$><Renderer.Binary {...meta} {...ctx}/></$>
      case FileType.Text:
        return <$><Renderer.Text {...meta} {...ctx}/></$>
      case FileType.Note:
        return <$><Renderer.Note {...meta} {...ctx}/></$>
      case FileType.Document:
        return <$><Renderer.Document {...meta} {...ctx}/></$>
      case FileType.Spreadsheet:
        return <$><Renderer.Spreadsheet {...meta} {...ctx}/></$>
      case FileType.Presentation:
        return <$><Renderer.Presentation {...meta} {...ctx}/></$>
      case FileType.Markdown:
        return <$><Renderer.Markdown {...meta} {...ctx}/></$>
      case FileType.Audio:
        return <$><Renderer.Audio {...meta} {...ctx}/></$>
      case FileType.Video:
        return <$><Renderer.Video {...meta} {...ctx}/></$>
      case FileType.Image:
        return <$><Renderer.Image {...meta} {...ctx}/></$>
      case FileType.Model:
        return <$><Renderer.Model {...meta} {...ctx}/></$>
      case FileType.Lottie:
        return <$><Renderer.Lottie {...meta} {...ctx}/></$>
      case FileType.Rive:
        return <$><Renderer.Rive {...meta} {...ctx}/></$>
      case FileType.Game:
        return <$><Renderer.Game {...meta} {...ctx}/></$>
      case FileType.Book:
        return <$><Renderer.Book {...meta} {...ctx}/></$>
      case FileType.Pdf:
        return <$><Renderer.Pdf {...meta} {...ctx}/></$>
      case FileType.Map:
        return <$><Renderer.Map {...meta} {...ctx}/></$>
      default: file satisfies never;
    }
  }, [ref, file, ctx, props.path, maximized, setBarIcon, setBarTitle]);
}));
