import './video.css';

import {useImperativeHandle, forwardRef, useRef} from 'react';
import {MediaPlayer, MediaProvider, Poster, Track, isHLSProvider} from '@vidstack/react';
import {DefaultVideoLayout, defaultLayoutIcons} from '@vidstack/react/player/layouts/default';

import type {VideoComponent, VideoProps, VideoRef} from './Video.interface';
import type {MediaPlayerInstance, MediaProviderAdapter, MediaProviderChangeEvent} from '@vidstack/react';

export const Video: VideoComponent = forwardRef((props: VideoProps, ref: React.Ref<VideoRef>) => {
  const player = useRef<MediaPlayerInstance>(null);

  // Expose player methods
  useImperativeHandle(ref, () => ({
    play: () =>
      Promise.resolve(player.current?.play()),
    pause: () =>
      Promise.resolve(player.current?.pause()),
    seek: (time: number) => {
      if (player.current)
        player.current.currentTime = time;
    },
    setVolume: (volume: number) => {
      if (player.current)
        player.current.volume = volume;
    },
    getCurrentTime: () => Promise.resolve(player.current?.currentTime ?? 0),
    presentFullscreen: () => player.current?.enterFullscreen(),
    dismissFullscreen: () => player.current?.exitFullscreen(),
    restoreUIForPictureInPicture: () => {},
  }));

  // Handle provider change
  function onProviderChange(
    provider: MediaProviderAdapter | null,
    _nativeEvent: MediaProviderChangeEvent,
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  return (
    <MediaPlayer
      crossOrigin
      playsInline
      ref={player}
      className="player"
      title={props.title}
      src={{
        src: props.source?.uri?.toString() ?? '',
        type: 'video/mp4',
      }}
      loop={props.repeat}
      muted={props.muted}
      volume={props.volume}
      paused={props.paused}
      controls={props.controls}
      playbackRate={props.rate}
      currentTime={props.currentPlaybackTime}
      fullscreenOrientation={props.fullscreenOrientation === 'all' ? 'any' : props.fullscreenOrientation}
      onProviderChange={onProviderChange}
      onCanPlay={props.onReadyForDisplay}>
      <MediaProvider>
        <Poster
          className="vds-poster"
          src={props.poster?.toString()}
        />
        {props.textTracks?.map((track) => (
          <Track
            kind="subtitles"
            key={track.uri}
            src={track.uri}
            label={track.title}
            language={track.language}
            type={track.type === 'text/vtt' ? 'vtt' : 'json'}
          />
        ))}
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        thumbnails={props.thumbnails?.toString()}
      />
    </MediaPlayer>
  );
});
