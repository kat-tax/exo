import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useMemo, useState, useEffect} from 'react';
import {share} from 'react-exo/device';
import {web} from 'react-exo/fs';
import {pin} from 'media/utils/ipfs';
import {FileType} from 'media/file/types';

import type {MediaControlsProps} from 'media/stacks/MediaControls';

export const IMPORTABLE = [FileType.Torrent, FileType.Binary];
export const SHAREABLE = [FileType.Image, FileType.Video, FileType.Audio, FileType.Pdf];
export const ZOOMABLE = [FileType.Image];
export const PLAYABLE = [FileType.Audio, FileType.Video, FileType.Game, FileType.Lottie, FileType.Rive];
export const DOCUMENT = [FileType.Book, FileType.Pdf];

export interface FileControl {
  title?: string,
  label?: React.ReactNode,
  name?: string,
  icon?: string,
  media?: FileType[],
  filter?: () => boolean,
  action?: () => void,
}

export function useFileControls(props: MediaControlsProps): FileControl[] {
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
      // Sequence controls (play/pause)
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
        name: 'reset',
        icon: 'ph:arrow-counter-clockwise',
        label: t(i18n)`Reset`,
        media: PLAYABLE,
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
        media: DOCUMENT,
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
        media: DOCUMENT,
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
        name: 'pin',
        icon: pinning
          ? 'ph:circle-notch'
          : pinned
            ? 'ph:push-pin'
            : 'ph:push-pin-slash',
        label: t(i18n)`Pin`,
        filter: () => !metadata.path.startsWith('ipfs://'),
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
        filter: () => !!pinned
          || SHAREABLE.includes(renderer[0])
          || metadata.path.startsWith('ipfs://'),
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
