import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useMemo, useState, useEffect} from 'react';
import {share} from 'react-exo/device';
import {web} from 'react-exo/fs';
import {pin} from 'media/utils/ipfs';
import {FileType} from 'media/file/types';

import type {MediaControlsProps} from 'media/stacks/MediaControls';

export const SHAREABLE = [FileType.Image, FileType.Video, FileType.Audio, FileType.Pdf];
export const IMPORTABLE = [FileType.Torrent, FileType.Binary, FileType.Zip];
export const EXTRACTABLE = [FileType.Zip];
export const CONFIGURABLE = [FileType.Video, FileType.Audio];
export const REPLAYABLE = [FileType.Audio, FileType.Lottie, FileType.Rive];
export const EDITABLE = [FileType.Text, FileType.Markdown];
export const PLAYABLE = [FileType.Audio, FileType.Video, FileType.Game, FileType.Lottie, FileType.Rive];
export const PAGEABLE = [FileType.Book, FileType.Pdf];
export const ZOOMABLE = [FileType.Image];
export const SKIPABLE = [FileType.Video];
export const AUDIBLE = [FileType.Audio, FileType.Video];

export interface MediaControl {
  title?: string,
  label?: React.ReactNode,
  name?: string,
  icon?: string,
  media?: FileType[],
  filter?: () => boolean,
  action?: () => void,
}

export function useMediaControls(props: MediaControlsProps): MediaControl[] {
  const {file, renderer, metadata, close, open} = props;
  const [pinning, setPinning] = useState(false);
  const [pinned, setPinned] = useState<string>();
  const {i18n} = useLingui();

  useEffect(() => {
    if (metadata.path) {
      setPinned(undefined);
      setPinning(false);
    }
  }, [metadata]);

  return useMemo(() =>
    [
      // Edit controls
      {
        name: 'edit',
        icon: 'ph:pencil-simple',
        label: t(i18n)`Edit`,
        media: EDITABLE,
        action: () => {
          console.log('Edit', metadata.path);
        },
      },
      // Remote controls
      {
        name: 'download',
        icon: 'ph:download',
        label: t(i18n)`Download`,
        media: IMPORTABLE,
        action: () => {
          console.log('Download', metadata.path);
        },
      },
      // Archive controls
      {
        name: 'extract',
        icon: 'ph:box-arrow-up',
        label: t(i18n)`Extract`,
        media: EXTRACTABLE,
        action: () => {
          console.log('Extract', metadata.path);
        },
      },
      // Zoom controls
      {
        name: 'zoom-in',
        icon: 'ph:plus',
        label: t(i18n)`Zoom in`,
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
        label: t(i18n)`Zoom out`,
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
          ? t(i18n)`Pause`
          : t(i18n)`Play`,
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
        label: t(i18n)`Skip backward`,
        media: SKIPABLE,
        action: () => {
          console.log('Skip backward', metadata.path);
        },
      },
      {
        name: 'skip-forward',
        icon: 'ph:skip-forward',
        label: t(i18n)`Skip forward`,
        media: SKIPABLE,
        action: () => {
          console.log('Skip forward', metadata.path);
        },
      },
      {
        name: 'volume',
        icon: metadata.muted
          ? 'ph:speaker-x'
          : metadata.volume
            ? metadata.volume >= 80
              ? 'ph:speaker-high'
              : 'ph:speaker-low'
            : 'ph:speaker-none',
        label: t(i18n)`Volume`,
        media: AUDIBLE,
        action: () => {
          console.log('Volume', metadata.path);
        },
      },
      // Specific media controls (replay)
      {
        name: 'replay',
        icon: 'ph:arrow-counter-clockwise',
        label: t(i18n)`Replay`,
        media: REPLAYABLE,
        action: () => {
          if (file?.current && 'reset' in file.current) {
            file.current.reset();
          }
        },
      },
      // Book controls
      {
        name: 'prev',
        icon: 'ph:arrow-left',
        label: t(i18n)`Previous`,
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
        label: t(i18n)`Next`,
        media: PAGEABLE,
        action: () => {
          if (file?.current && 'nextPage' in file.current) {
            file.current.nextPage();
          }
        },
      },
      {
        name: 'banner',
        title: metadata.title,
        cover: metadata.cover,
        action: open,
      },
      // Window controls
      {
        name: 'fullscreen',
        icon: 'ph:arrows-out',
        label: t(i18n)`Fullscreen`,
        action: () => {},
      },
      {
        name: 'options',
        icon: 'ph:gear-six',
        label: t(i18n)`Options`,
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
        label: t(i18n)`Pin`,
        filter: () => false,
        action: async () => {
          setPinning(true);
          const name = `${metadata.name}.${metadata.ext}`;
          const url = await pin(metadata.path, name);
          setPinned(url);
          prompt(name, url);
          setPinning(false);
        },
      },
      {
        name: 'share',
        icon: 'ph:share-network',
        label: t(i18n)`Share`,
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
        name: 'maximize',
        icon: 'ph:arrow-square-out',
        label: t(i18n)`Maximize`,
        filter: () => false,
        action: open,
      },
      {
        name: 'close',
        icon: 'ph:x',
        label: t(i18n)`Close`,
        action: close,
      },
    ]
    .filter((e) => (!e.media || e.media?.includes(renderer[0])))
    .filter((e) => !e.filter || e.filter())
  , [file, renderer, metadata, i18n, open, close, pinning, pinned]);
}
