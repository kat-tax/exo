import type {ECBasicOption} from "echarts/types/dist/shared";

export default <ECBasicOption> {
  title: {
    text: 'Resources',
    top: 0,
  },
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
