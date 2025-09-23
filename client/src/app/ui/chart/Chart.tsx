import * as echarts from 'echarts/core';
import * as E from './lib/loader';
import Renderer from './lib/renderer';
import ChartView from '@wuba/react-native-echarts/skiaChart';
import {useRef, useEffect, useCallback} from 'react';
import {withUnistyles} from 'react-native-unistyles';
import {View} from 'react-native';

import type {ChartOption} from './lib/loader';
import type {ColorSchemeName, LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';

echarts.use([Renderer, ...Object.values(E)]);

interface ChartProps {
  option: ChartOption;
  theme?: ColorSchemeName;
  width?: number | 'auto';
  height?: number | 'auto';
  useRNGH?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Chart = withUnistyles(({
  option,
  theme = 'light',
  width = 'auto',
  height = 'auto',
  useRNGH = false,
  style,
}: ChartProps) => {
  const skia = useRef<any>(null);
  const chart = useRef<echarts.ECharts | null>(null);

  // Initialize chart when component mounts
  useEffect(() => {
    if (skia.current) {
      chart.current = echarts.init(skia.current, theme, {
        // @ts-expect-error: React Native
        renderer: 'skia',
        width: width === 'auto' ? 300 : width,
        height: height === 'auto' ? 300 : height,
      });
    }
    return () => chart.current?.dispose();
  }, [theme]);

  // Update chart options when props change
  useEffect(() => {
    if (chart.current) {
      chart.current.setOption(option);
    }
  }, [option]);

  // Resize chart when parent changes size
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    if (chart.current && (width === 'auto' || height === 'auto')) {
      const _width = width === 'auto' ? e.nativeEvent.layout.width : width;
      const _height = height === 'auto' ? e.nativeEvent.layout.height : height;
      chart.current?.resize({
        width: _width,
        height: _height,
      });
    }
  }, [width, height]);

  return (
    <View
      onLayout={onLayout}
      style={[{
        flex: 1,
        height: height === 'auto' ? undefined : height,
        width: width === 'auto' ? undefined : width,
      }, style]}>
      <ChartView ref={skia} useRNGH={useRNGH}/>
    </View>
  );
}, () => ({
  option: {
    backgroundColor: 'transparent',
  },
}));
