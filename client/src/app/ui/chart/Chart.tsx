import * as echarts from 'echarts/core';
import {SkiaRenderer, SkiaChart} from '@wuba/react-native-echarts';
import {useRef, useEffect, useCallback} from 'react';
import {withUnistyles} from 'react-native-unistyles';
import {View} from 'react-native';

import * as E from './Chart.loader';

import type {ECBasicOption} from 'echarts/types/dist/shared';
import type {ColorSchemeName, LayoutChangeEvent} from 'react-native';

echarts.use([
  // Renderers
  SkiaRenderer,
  // Charts
  E.BarChart,
  E.BoxplotChart,
  E.CandlestickChart,
  E.ChordChart,
  E.CustomChart,
  E.EffectScatterChart,
  E.FunnelChart,
  E.GaugeChart,
  E.GraphChart,
  E.HeatmapChart,
  E.LineChart,
  E.LinesChart,
  E.MapChart,
  E.ParallelChart,
  E.PictorialBarChart,
  E.PieChart,
  E.RadarChart,
  E.SankeyChart,
  E.ScatterChart,
  E.SunburstChart,
  E.ThemeRiverChart,
  E.TreeChart,
  E.TreemapChart,
  // Components
  E.AriaComponent,
  E.AxisPointerComponent,
  E.BrushComponent,
  E.CalendarComponent,
  E.DatasetComponent,
  E.DataZoomComponent,
  E.DataZoomInsideComponent,
  E.DataZoomSliderComponent,
  E.GeoComponent,
  E.GraphicComponent,
  E.GridComponent,
  E.GridSimpleComponent,
  E.LegendComponent,
  E.LegendPlainComponent,
  E.LegendScrollComponent,
  E.MarkAreaComponent,
  E.MarkLineComponent,
  E.MarkPointComponent,
  E.MatrixComponent,
  E.ParallelComponent,
  E.PolarComponent,
  E.RadarComponent,
  E.SingleAxisComponent,
  E.ThumbnailComponent,
  E.TimelineComponent,
  E.TitleComponent,
  E.ToolboxComponent,
  E.TooltipComponent,
  E.TransformComponent,
  E.VisualMapComponent,
  E.VisualMapContinuousComponent,
  E.VisualMapPiecewiseComponent,
]);

interface ChartProps {
  option: ECBasicOption;
  theme?: ColorSchemeName;
  width?: number | 'auto';
  height?: number | 'auto';
  useRNGH?: boolean;
}

export const Chart = withUnistyles(({
  option,
  theme = 'light',
  width = 'auto',
  height = 'auto',
  useRNGH = false,
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
    <View onLayout={onLayout} style={{flex: 1}}>
      <SkiaChart ref={skia} useRNGH={useRNGH}/>
    </View>
  );
}, () => ({
  option: {
    backgroundColor: 'transparent',
  },
}));
