import type {ECBasicOption} from "echarts/types/dist/shared";

export default <ECBasicOption> {
  title: {
    text: 'Commits',
    top: 0,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
    }
  ],
}
