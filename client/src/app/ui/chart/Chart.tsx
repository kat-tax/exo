import {useRef, useEffect} from 'react';
import * as echarts from 'echarts/core';
import {LineChart, PieChart} from 'echarts/charts';
import {GridComponent, LegendComponent} from 'echarts/components';
import {SkiaRenderer, SkiaChart} from '@wuba/react-native-echarts';
import {withUnistyles} from 'react-native-unistyles';

import type {ECBasicOption} from 'echarts/types/dist/shared';
import type {ColorSchemeName} from 'react-native';

echarts.use([
  SkiaRenderer,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
]);

interface ChartProps {
  option: ECBasicOption;
  theme?: ColorSchemeName;
  width?: number;
  height?: number;
}

export const Chart = withUnistyles(({
  option,
  theme = 'light',
  width = 400,
  height = 400,
}: ChartProps) => {
  const skia = useRef<any>(null);

  useEffect(() => {
    let chart: echarts.ECharts;
    if (skia.current) {
      chart = echarts.init(skia.current, theme, {
        // @ts-expect-error: React Native
        renderer: 'skia',
        width,
        height,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option, theme]);

  return <SkiaChart ref={skia}/>;
}, () => ({
  option: {
    backgroundColor: 'transparent',
  },
}));
