import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useMemo, useState, useEffect} from 'react';
import {share} from 'react-exo/device';
import {pin} from 'media/utils/ipfs';
import {FileType} from 'media/utils/file';
import {web} from 'react-exo/fs';

import type {CurrentFileBarProps} from 'media/stacks/CurrentFileBar';

export const SEQUENCE = [FileType.Audio, FileType.Video, FileType.Game, FileType.Lottie, FileType.Rive];
export const DOCUMENT = [FileType.Book, FileType.Pdf];
export const SHAREABLE = [FileType.Image];
export const ZOOMABLE = [FileType.Image];

export interface CurrentFileActions {
  title?: string,
  label?: React.ReactNode,
  name?: string,
  icon?: string,
  media?: FileType[],
  filter?: () => boolean,
  action?: () => void,
}

export function useFileControls(props: CurrentFileBarProps): CurrentFileActions[] {
  const {i18n} = useLingui();
  const {player, fileData, metadata, close, open} = props;
  const [pinned, setPinned] = useState<string>();
  const [pinning, setPinning] = useState(false);

  const actions: CurrentFileActions[] = useMemo(() =>
    [
      // Zoom controls
      {
        name: 'zoom-in',
        label: t(i18n)`Zoom in`,
        icon: 'ph:plus',
        media: ZOOMABLE,
        action: () => {
          if (player?.current && 'increase' in player.current) {
            player.current.increase();
          }
        },
      },
      {
        name: 'zoom-out',
        label: t(i18n)`Zoom out`,
        icon: 'ph:minus',
        media: ZOOMABLE,
        action: () => {
          if (player?.current && 'decrease' in player.current) {
            player.current.decrease();
          }
        },
      },
      // Sequence controls (play/pause)
      {
        name: 'play',
        label: metadata.playing ? t(i18n)`Pause` : t(i18n)`Play`,
        icon: metadata.playing ? 'ph:pause' : 'ph:play',
        media: SEQUENCE,
        action: () => {
          if (!player?.current) return;
          if ('pause' in player.current) {
            if (metadata.playing) {
              player.current.pause();
            } else {
              if ('resume' in player.current) {
                player.current.resume();
              } else {
                player.current.play();
              }
            }
          }
        },
      },
      {
        name: 'reset',
        label: t(i18n)`Reset`,
        icon: 'ph:arrow-counter-clockwise',
        media: SEQUENCE,
        action: () => {
          if (player?.current && 'reset' in player.current) {
            player.current.reset();
          }
        },
      },
      // Book controls
      {
        name: 'prev',
        label: t(i18n)`Previous`,
        icon: 'ph:arrow-left',
        media: DOCUMENT,
        action: () => {
          if (player?.current && 'prevPage' in player.current) {
            player.current.prevPage();
          }
        },
      },
      {
        name: 'next',
        label: t(i18n)`Next`,
        icon: 'ph:arrow-right',
        media: DOCUMENT,
        action: () => {
          if (player?.current && 'nextPage' in player.current) {
            player.current.nextPage();
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
        label: t(i18n)`Pin`,
        icon: pinning
          ? 'ph:circle-notch'
          : pinned
            ? 'ph:push-pin'
            : 'ph:push-pin-slash',
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
        label: t(i18n)`Share`,
        icon: 'ph:share-network',
        filter: () => !!pinned
          || SHAREABLE.includes(fileData[0])
          || metadata.path.startsWith('ipfs://'),
        action: async () => {
          const url = pinned;
          const title = `${metadata.name}.${metadata.ext}`;
          const files: File[] = [];
          if (SHAREABLE.includes(fileData[0])) {
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
        label: t(i18n)`Maximize`,
        icon: 'ph:arrow-square-out',
        filter: () => false,
        action: open,
      },
      {
        name: 'close',
        label: t(i18n)`Close`,
        icon: 'ph:x',
        action: close,
      },
    ]
    .filter((e) => (!e.media || e.media?.includes(fileData[0])))
    .filter((e) => !e.filter || e.filter())
  , [player, fileData, metadata, i18n, open, close, pinning, pinned]);

  useEffect(() => {
    if (metadata.path) {
      setPinned(undefined);
      setPinning(false);
    }
  }, [metadata]);

  return actions;
}
