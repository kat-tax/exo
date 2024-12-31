import {View} from 'react-native';
import {useRive, Layout} from '@rive-app/react-canvas';
import {forwardRef, useImperativeHandle} from 'react';

import type {RiveComponent, RiveProps, RiveRef} from './Rive.interface';
import type {Fit} from '@rive-app/react-canvas';

/** A component that renders Rive animations */
export const Rive: RiveComponent = forwardRef((props: Omit<RiveProps, 'ref'>, ref: React.Ref<RiveRef>) => {
  const {rive, RiveComponent} = useRive({
    src: props.url,
    autoplay: props.autoplay,
    artboard: props.artboardName,
    animations: props.animationName,
    stateMachines: props.stateMachineName,
    layout: new Layout({fit: props.resizeMode as Fit}),
  });

  useImperativeHandle(ref, () => ({
    play: () => {
      rive?.play();
    },
    stop: () => {
      rive?.stop();
    },
    pause: () => {
      rive?.pause();
    },
    reset: () => {
      rive?.reset();
    },
    setTextRunValue: (textRunName: string, value: string) => {
      rive?.setTextRunValue(textRunName, value);
    },
    setTextRunValueAtPath: (textRunName: string, path: string, value: string) => {
      rive?.setTextRunValueAtPath(textRunName, path, value);
    },
    fireStateAtPath: (inputName: string, path: string) => {
      rive?.fireStateAtPath(inputName, path);
    },
    fireState: () => {
      // no-op on web
    },
    setInputState: () => {
      // no-op on web
    },
    setInputStateAtPath: () => {
      // no-op on web
    },
    touchBegan: () => {
      // no-op on web
    },
    touchEnded: () => {
      // no-op on web
    },
  }));

  return (
    <View style={props.style} testID={props.testID}>
      <RiveComponent/>
    </View>
  );
});
