import VideoBase from 'react-native-video';
import {useImperativeHandle, forwardRef, useRef} from 'react';

import type {VideoRef as VideoBaseRef} from 'react-native-video';
import type {VideoComponent, VideoProps, VideoRef} from './Video.interface';

export const Video: VideoComponent = forwardRef(({title, thumbnails, ...props}: VideoProps, ref: React.Ref<VideoRef>) => {
  const video = useRef<VideoBaseRef>(null);

  useImperativeHandle(ref, () => ({
    play: () =>
      Promise.resolve(video.current?.resume()),
    pause: () =>
      Promise.resolve(video.current?.pause()),
    seek: (time: number, tolerance?: number) =>
      video.current?.seek(time, tolerance),
    setVolume: (volume: number) =>
      video.current?.setVolume(volume),
    getCurrentTime: () =>
      Promise.resolve(video.current?.getCurrentPosition() || 0),
    presentFullscreen: () =>
      video.current?.presentFullscreenPlayer(),
    dismissFullscreen: () =>
      video.current?.dismissFullscreenPlayer(),
    restoreUIForPictureInPicture: (restore: boolean) =>
      video.current?.restoreUserInterfaceForPictureInPictureStopCompleted(restore),
  }));

  return (
    <VideoBase
      // React
      ref={video}
      style={props.style}
      // Media
      source={props.source}
      poster={props.poster}
      chapters={props.chapters}
      textTracks={props.textTracks}
      selectedTextTrack={props.selectedTextTrack}
      selectedAudioTrack={props.selectedAudioTrack}
      selectedVideoTrack={props.selectedVideoTrack}
      // Events
      onBuffer={props.onBuffer}
      onEnd={props.onEnd}
      onError={props.onError}
      onLoad={props.onLoad}
      onLoadStart={props.onLoadStart}
      onProgress={props.onProgress}
      onReadyForDisplay={props.onReadyForDisplay}
      // Video
      filter={props.filter}
      filterEnabled={props.filterEnabled}
      viewType={props.viewType}
      // Audio
      muted={props.muted}
      volume={props.volume}
      audioOutput={props.audioOutput}
      mixWithOthers={props.mixWithOthers}
      ignoreSilentSwitch={props.ignoreSilentSwitch}
      // Playback
      rate={props.rate}
      paused={props.paused}
      repeat={props.repeat}
      playInBackground={props.playInBackground}
      playWhenInactive={props.playWhenInactive}
      contentStartTime={props.contentStartTime}
      maxBitRate={props.maxBitRate}
      bufferConfig={props.bufferConfig}
      bufferingStrategy={props.bufferingStrategy}
      minLoadRetryCount={props.minLoadRetryCount}
      progressUpdateInterval={props.progressUpdateInterval}
      preferredForwardBufferDuration={props.preferredForwardBufferDuration}
      automaticallyWaitsToMinimizeStalling={props.automaticallyWaitsToMinimizeStalling}
      allowsExternalPlayback={props.allowsExternalPlayback}
      // Interface
      renderLoader={props.renderLoader}
      resizeMode={props.resizeMode}
      focusable={props.focusable}
      disableFocus={props.disableFocus}
      controls={props.controls}
      controlsStyles={props.controlsStyles}
      subtitleStyle={props.subtitleStyle}
      fullscreen={props.fullscreen}
      fullscreenAutorotate={props.fullscreenAutorotate}
      fullscreenOrientation={props.fullscreenOrientation}
      pictureInPicture={props.pictureInPicture}
      hideShutterView={props.hideShutterView}
      shutterColor={props.shutterColor}
      showNotificationControls={props.showNotificationControls}
      // Advertising
      adTagUrl={props.adTagUrl}
      currentPlaybackTime={props.currentPlaybackTime}
      // Other
      localSourceEncryptionKeyScheme={props.localSourceEncryptionKeyScheme}
      disableDisconnectError={props.disableDisconnectError}
      reportBandwidth={props.reportBandwidth}
      debug={props.debug}
      testID={props.testID}
    />
  );
});

/**
 *     source?: ReactVideoSource;
    style?: StyleProp<ViewStyle>;
    adTagUrl?: string;
    audioOutput?: AudioOutput;
    automaticallyWaitsToMinimizeStalling?: boolean;
    bufferConfig?: BufferConfig;
    bufferingStrategy?: BufferingStrategyType;
    chapters?: Chapters[];
    contentStartTime?: number;
    controls?: boolean;
    currentPlaybackTime?: number;
    disableFocus?: boolean;
    disableDisconnectError?: boolean;
    filter?: EnumValues<FilterType>;
    filterEnabled?: boolean;
    focusable?: boolean;
    fullscreen?: boolean;
    fullscreenAutorotate?: boolean;
    fullscreenOrientation?: EnumValues<FullscreenOrientationType>;
    hideShutterView?: boolean;
    ignoreSilentSwitch?: EnumValues<IgnoreSilentSwitchType>;
    minLoadRetryCount?: number;
    maxBitRate?: number;
    mixWithOthers?: EnumValues<MixWithOthersType>;
    muted?: boolean;
    paused?: boolean;
    pictureInPicture?: boolean;
    playInBackground?: boolean;
    playWhenInactive?: boolean;
    poster?: string | ReactVideoPoster;
    preferredForwardBufferDuration?: number;
    preventsDisplaySleepDuringVideoPlayback?: boolean;
    progressUpdateInterval?: number;
    rate?: number;
    renderLoader?: ReactNode;
    repeat?: boolean;
    reportBandwidth?: boolean;
    resizeMode?: EnumValues<VideoResizeMode>;
    showNotificationControls?: boolean;
    selectedAudioTrack?: SelectedTrack;
    selectedTextTrack?: SelectedTrack;
    selectedVideoTrack?: SelectedVideoTrack;
    subtitleStyle?: SubtitleStyle;
    shutterColor?: string;
    textTracks?: TextTracks;
    testID?: string;
    viewType?: ViewType;
    volume?: number;
    localSourceEncryptionKeyScheme?: string;
    debug?: DebugConfig;
    allowsExternalPlayback?: boolean;
    controlsStyles?: ControlsStyles; 
 * 
 */