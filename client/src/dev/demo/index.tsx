import {Chart} from 'app/ui/chart/Chart';
import {Frame} from 'dev/stacks/frame';

import bar from './bar';
import gauge from './gauge';
import graph from './graph';
import heatmap from './heatmap';
import line from './line';
import pictorial from './pictorial';
import pie from './pie';
import scatter from './scatter';
import zoom from './zoom';

import type {ColorSchemeName} from 'react-native';

export default ({theme}: {theme: ColorSchemeName}) => <>
  <Frame title="Bar" noScroll>
    <Chart theme={theme} height={400} option={bar}/>
  </Frame>
  <Frame title="Gauge" noScroll>
    <Chart theme={theme} height={400} option={gauge}/>
  </Frame>
  <Frame title="Graph" noScroll>
    <Chart theme={theme} height={600} option={graph}/>
  </Frame>
  <Frame title="Heatmap" noScroll>
    <Chart theme={theme} height={250} option={heatmap}/>
  </Frame>
  <Frame title="Line" noScroll>
    <Chart theme={theme} height={400} option={line}/>
  </Frame>
  <Frame title="Pictorial" noScroll>
    <Chart theme={theme} height={400} option={pictorial}/>
  </Frame>
  <Frame title="Pie" noScroll>
    <Chart theme={theme} height={300} option={pie}/>
  </Frame>
  <Frame title="Scatter" noScroll>
    <Chart theme={theme} height={600} option={scatter}/>
  </Frame>
  <Frame title="Zoom" noScroll>
    <Chart useRNGH theme={theme} height={750} option={zoom}/>
  </Frame>
</>
