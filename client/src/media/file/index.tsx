import File from 'media/file/loader';

import {forwardRef, memo} from 'react';
import {Suspense as $} from 'app/stacks/Suspense';
import {FileType} from 'media/file/types';
import {resolve} from 'media/utils/path';

import type {FileRenderInfo} from 'media/file/types';

export interface FileProps {
  path: string,
  maximized: boolean,
  renderer?: FileRenderInfo,
  close: () => void,
  setBarIcon: (icon: string) => void,
  setBarTitle: (title: string) => void,
}

export default memo(forwardRef((props: FileProps, ref) => {
  const {maximized, renderer, setBarTitle, setBarIcon} = props;
  const [file, ctx] = renderer || [];
  if (!file) return null;

  const parts = resolve(props.path || '');
  const path = parts.join('/');
  const name = parts.pop() || '';
  const extension = name?.split('.').pop() || '';
  const meta = {ref, name, extension, path, maximized, setBarIcon, setBarTitle};

  switch (file) {
    case FileType.Binary:
      return <$><File.Binary {...meta} {...ctx}/></$>
    case FileType.Text:
      return <$><File.Text {...meta} {...ctx}/></$>
    case FileType.Note:
      return <$><File.Note {...meta} {...ctx}/></$>
    case FileType.Document:
      return <$><File.Document {...meta} {...ctx}/></$>
    case FileType.Spreadsheet:
      return <$><File.Spreadsheet {...meta} {...ctx}/></$>
    case FileType.Presentation:
      return <$><File.Presentation {...meta} {...ctx}/></$>
    case FileType.Markdown:
      return <$><File.Markdown {...meta} {...ctx}/></$>
    case FileType.Audio:
      return <$><File.Audio {...meta} {...ctx}/></$>
    case FileType.Video:
      return <$><File.Video {...meta} {...ctx}/></$>
    case FileType.Image:
      return <$><File.Image {...meta} {...ctx}/></$>
    case FileType.Model:
      return <$><File.Model {...meta} {...ctx}/></$>
    case FileType.Lottie:
      return <$><File.Lottie {...meta} {...ctx}/></$>
    case FileType.Rive:
      return <$><File.Rive {...meta} {...ctx}/></$>
    case FileType.Game:
      return <$><File.Game {...meta} {...ctx}/></$>
    case FileType.Book:
      return <$><File.Book {...meta} {...ctx}/></$>
    case FileType.Pdf:
      return <$><File.Pdf {...meta} {...ctx}/></$>
    case FileType.Map:
      return <$><File.Map {...meta} {...ctx}/></$>
    case FileType.Torrent:
      return <$><File.Torrent {...meta} {...ctx}/></$>
    case FileType.Zip:
      return <$><File.Zip {...meta} {...ctx}/></$>
    default: file satisfies never;
  }
}));
