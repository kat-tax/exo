import {useMemo} from 'react';
import {resolve} from 'media/utils/path';

import {FileDownload} from './FileDownload';
import {FileMarkdown} from './FileMarkdown';
import {FileImage} from './FileImage';
import {FileGame} from './FileGame';
import {FilePDF} from './FilePDF';

interface FileProps {
  path: string,
  maximized: boolean,
  close: () => void,
}

export function File(props: FileProps) {
  const {maximized} = props;
  const parts = resolve(props.path);
  const path = parts.join('/');
  const [name, extension] = parts.slice(-1)[0].split('.') ?? [];

  const renderer = useMemo(() => {
    if (!extension) return null;
    const $ = {path, name, extension, maximized};
    switch (extension.toLowerCase()) {
      // Images
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'ico':
      case 'tiff':
      case 'webp':
      case 'avif':
      case 'heic':
      case 'heif':
      case 'svg':
      case 'raw':
        return <FileImage {...$}/>
      // Documents
      case 'pdf':
        return <FilePDF {...$}/>
      // Markdown
      case 'md':
      case 'mdx':
      case 'markdown':
        return <FileMarkdown {...$}/>
      // Roms
      case 'n64':
      case 'v64':
      case 'z64':
        return <FileGame {...$} platform="n64"/>
      case 'gb':
      case 'gbc':
        return <FileGame {...$} platform="gb"/>
      case 'gba':
        return <FileGame {...$} platform="gba"/>
      case 'nds':
        return <FileGame {...$} platform="nds"/>
      case 'nes':
        return <FileGame {...$} platform="nes"/>
      case 'sfc':
      case 'smc':
        return <FileGame {...$} platform="snes"/>
      case 'psx':
        return <FileGame {...$} platform="psx"/>
      case 'gen':
        return <FileGame {...$} platform="segaMD"/>
      case 'sms':
        return <FileGame {...$} platform="segaMS"/>
      case 'gg':
        return <FileGame {...$} platform="segaGG"/>
      case 'scd':
        return <FileGame {...$} platform="segaCD"/>
      case '32x':
        return <FileGame {...$} platform="sega32x"/>
      case 'sat':
        return <FileGame {...$} platform="segaSaturn"/>
      case 'a78':
        return <FileGame {...$} platform="atari7800"/>
      case 'a26':
        return <FileGame {...$} platform="atari2600"/>
      case 'jag':
      case 'j64':
        return <FileGame {...$} platform="jaguar"/>
      case 'lnx':
        return <FileGame {...$} platform="lynx"/>
      case 'pce':
        return <FileGame {...$} platform="pce"/>
      case 'pcfx':
        return <FileGame {...$} platform="pcfx"/>
      case 'ngp':
        return <FileGame {...$} platform="ngp"/>
      case 'vb':
        return <FileGame {...$} platform="vb"/>
      case 'ws':
      case 'wsc':
        return <FileGame {...$} platform="ws"/>
      case 'col':
        return <FileGame {...$} platform="coleco"/>
      case 'd64':
      case 't64':
      case 'prg':
        return <FileGame {...$} platform="vice_x64"/>
      // Unsupported
      default:
        return <FileDownload {...$}/>
    }
  }, [extension, name, path, maximized]);

  return renderer;
}
