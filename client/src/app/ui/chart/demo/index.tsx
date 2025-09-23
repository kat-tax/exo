import type {ChartOption} from '../lib/loader';

import bar from './bar';
import line from './line';
import pie from './pie';
import gauge from './gauge';
import pictorial from './pictorial';
import heatmap from './heatmap';
import scatter from './scatter';
import zoom from './zoom';
import graph from './graph';
import tree from './tree';

interface DemoChart {
  title: string;
  option: ChartOption;
  height: number;
  useRNGH?: boolean;
}

export default [
  {title: 'Bar', option: bar, height: 400},
  {title: 'Line', option: line, height: 400},
  {title: 'Pie', option: pie, height: 400},
  {title: 'Gauge', option: gauge, height: 400},
  {title: 'Pictorial', option: pictorial, height: 400},
  {title: 'Heatmap', option: heatmap, height: 400},
  {title: 'Scatter', option: scatter, height: 600},
  {title: 'Zoom', option: zoom, height: 600, useRNGH: true},
  {title: 'Graph', option: graph, height: 600},
  {title: 'Tree', option: tree, height: 900},
] as const satisfies DemoChart[];
