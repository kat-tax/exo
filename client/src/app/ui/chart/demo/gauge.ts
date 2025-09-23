import type {ChartOption} from '../lib/loader';

export default <ChartOption> {
  tooltip: {
    formatter: '{a} {b} : {c}%'
  },
  series: [
    {
      type: 'gauge',
      name: 'CPU',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%'
      },
      data: [
        {
          value: 69,
          name: 'CPU'
        }
      ]
    }
  ],
}
