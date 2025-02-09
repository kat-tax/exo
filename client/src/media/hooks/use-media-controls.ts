import {useLingui} from '@lingui/react/macro';
import {useMemo, useState, useEffect} from 'react';
import {share} from 'react-exo/device';
import {web} from 'react-exo/fs';
import {pinFile} from 'media/dir/utils/ipfs/pin';
import {FileType} from 'media/file/types';

import type {MediaControlsProps} from 'media/stacks/controls';

export const SHAREABLE = [FileType.Image, FileType.Video, FileType.Audio, FileType.Pdf];
export const EXTRACTABLE = [FileType.Zip];
export const DOWNLOADABLE = [FileType.Torrent, FileType.Binary];
export const CONFIGURABLE = [FileType.Video, FileType.Audio, FileType.Image, FileType.Pdf, FileType.Book/*, FileType.Text*/];
export const SEARCHABLE = [FileType.Map];
export const SEEKABLE = [FileType.Audio, FileType.Video, FileType.Book];
export const LOOPABLE = [FileType.Lottie, FileType.Rive];
export const COPYABLE = [FileType.Text, FileType.Markdown];
export const EDITABLE = [/*FileType.Text, FileType.Markdown*/];
export const PLAYABLE = [FileType.Audio, FileType.Video, FileType.Game, FileType.Lottie, FileType.Rive];
export const PAGEABLE = [FileType.Book, FileType.Pdf];
export const ZOOMABLE = [FileType.Image];
export const SKIPABLE = [FileType.Audio, FileType.Video];
export const AUDIBLE = [FileType.Audio, FileType.Video];

export interface MediaControls {
  controls: Array<MediaControl>,
  seekable: boolean,
}

export interface MediaControl {
  title?: string,
  label?: React.ReactNode,
  name?: string,
  icon?: string,
  media?: FileType[],
  filter?: () => boolean,
  action?: () => void,
}

export function useMediaControls(props: MediaControlsProps): MediaControls {
  const {file, renderer, metadata, actions} = props;
  const [pinning, setPinning] = useState(false);
  const [pinned, setPinned] = useState<string>();
  const {t} = useLingui();

  useEffect(() => {
    if (metadata.path) {
      setPinned(undefined);
      setPinning(false);
    }
  }, [metadata]);

  const controls = useMemo(() => renderer ? [
    // Edit controls
    {
      name: 'copy',
      icon: 'ph:copy',
      label: t`Copy`,
      media: COPYABLE,
      action: () => {
        console.log('Copy', metadata.path);
      },
    },
    {
      name: 'edit',
      icon: 'ph:pencil-simple',
      label: t`Edit`,
      media: EDITABLE,
      action: () => {
        console.log('Edit', metadata.path);
      },
    },
    // Remote controls
    {
      name: 'download',
      icon: 'ph:download',
      label: t`Download`,
      media: DOWNLOADABLE,
      action: () => {
        console.log('Download', metadata.path);
      },
    },
    // Archive controls
    {
      name: 'extract',
      icon: 'ph:box-arrow-up',
      label: t`Extract`,
      media: EXTRACTABLE,
      action: () => {
        console.log('Extract', metadata.path);
      },
    },
    // Search controls
    {
      name: 'search',
      icon: 'ph:magnifying-glass',
      label: t`Search`,
      media: SEARCHABLE,
      action: () => {
        console.log('Search', metadata.path);
      },
    },
    // Zoom controls
    {
      name: 'zoom-in',
      icon: 'ph:plus',
      label: t`Zoom in`,
      media: ZOOMABLE,
      action: () => {
        if (file?.current && 'increase' in file.current) {
          file.current.increase();
        }
      },
    },
    {
      name: 'zoom-out',
      icon: 'ph:minus',
      label: t`Zoom out`,
      media: ZOOMABLE,
      action: () => {
        if (file?.current && 'decrease' in file.current) {
          file.current.decrease();
        }
      },
    },
    // Media controls
    {
      name: 'play',
      label: metadata.playing
        ? t`Pause`
        : t`Play`,
      icon: metadata.playing
        ? 'ph:pause'
        : 'ph:play',
      media: PLAYABLE,
      action: () => {
        if (!file?.current) return;
        if ('play' in file.current) {
          if (metadata.playing) {
            file.current.pause();
          } else {
            file.current.play();
          }
        }
      },
    },
    {
      name: 'skip-backward',
      icon: 'ph:skip-back',
      label: t`Skip backward`,
      media: SKIPABLE,
      action: () => {
        if (file?.current && 'seek' in file.current) {
          file.current.seek((metadata.current ?? 0) - 10);
        }
      },
    },
    {
      name: 'skip-forward',
      icon: 'ph:skip-forward',
      label: t`Skip forward`,
      media: SKIPABLE,
      action: () => {
        if (file?.current && 'seek' in file.current) {
          file.current.seek((metadata.current ?? 0) + 10);
        }
      },
    },
    {
      name: 'replay',
      icon: 'ph:arrow-counter-clockwise',
      label: t`Replay`,
      media: LOOPABLE,
      action: () => {
        if (file?.current && 'reset' in file.current) {
          file.current.reset();
        }
      },
    },
    // Page controls
    {
      name: 'prev',
      icon: 'ph:arrow-left',
      label: t`Previous`,
      media: PAGEABLE,
      action: () => {
        if (file?.current && 'prevPage' in file.current) {
          file.current.prevPage();
        }
      },
    },
    {
      name: 'next',
      icon: 'ph:arrow-right',
      label: t`Next`,
      media: PAGEABLE,
      action: () => {
        if (file?.current && 'nextPage' in file.current) {
          file.current.nextPage();
        }
      },
    },
    // Title (center)
    {
      name: 'banner',
      title: metadata.title,
      cover: metadata.cover,
    },
    // Window controls
    {
      name: 'volume',
      icon: metadata.muted
        ? 'ph:speaker-x'
        : metadata.volume
          ? metadata.volume >= 80
            ? 'ph:speaker-high'
            : 'ph:speaker-low'
          : 'ph:speaker-none',
      label: t`Volume`,
      media: AUDIBLE,
      action: () => {
        if (file?.current && 'mute' in file.current) {
          file.current.mute(!metadata.muted);
          actions.setMuted(!metadata.muted);
        }
      },
    },
    {
      name: 'options',
      icon: 'ph:faders',
      label: t`Options`,
      media: CONFIGURABLE,
      action: () => {},
    },
    {
      name: 'pin',
      icon: pinning
        ? 'ph:circle-notch'
        : pinned
          ? 'ph:push-pin'
          : 'ph:push-pin-slash',
      label: t`Pin`,
      filter: () => false,
      action: async () => {
        setPinning(true);
        const name = `${metadata.name}.${metadata.ext}`;
        const url = await pinFile(metadata.path, name);
        setPinned(url);
        prompt(name, url);
        setPinning(false);
      },
    },
    {
      name: 'share',
      icon: 'ph:share-network',
      label: t`Share`,
      filter: () => false,
      action: async () => {
        const url = pinned;
        const title = `${metadata.name}.${metadata.ext}`;
        const files: File[] = [];
        if (SHAREABLE.includes(renderer[0])) {
          const buffer = await web.getFileBuffer(metadata.path);
          files.push(new File([buffer], title, {type: 'image/png'}));
        }
        try {
          share({url, title, files});
        } catch (e) {
          prompt(title, url);
        }
      },
    },
    {
      name: 'fullscreen',
      icon: 'ph:frame-corners',
      label: t`Fullscreen`,
      action: () => {
        if (file?.current && 'presentFullscreen' in file.current) {
          file.current.presentFullscreen();
        }
      },
    },
    {
      name: 'close',
      icon: 'ph:x',
      label: t`Close`,
      filter: () => false,
      action: actions.close,
    }]
    .filter((e) => (!e.media || e.media?.includes(renderer[0])))
    .filter((e) => !e.filter || e.filter())
  : [], [file, renderer, metadata, pinning, pinned, actions, t]);

  return {
    controls,
    seekable: renderer ? SEEKABLE.includes(renderer[0]) : false,
  };
}
