import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data'],
  data() {
    return {
      labelXAxis: [],
      maxTime: null,
      stepSize: null
    }
  },
  methods: {
    getLabelAndDatas() {
      this.labelXAxis = this.data.map((label, index) => index + 1)
      const maxTime = Math.max(...this.data)
      this.maxTime = maxTime + (5 * maxTime / 100)
      this.stepSize = Math.ceil(maxTime / 5)
    }
  },
  mounted() {

    this.getLabelAndDatas()

    this.renderChart({
      labels: this.labelXAxis,
      datasets: [{
        data: this.data,
        fill: false,
        borderColor: '#63B3ED',
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0.1,
        pointHitRadius: 10,
      }]
    }, {
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            tickMarkLength: 5
          },
          ticks: {
            fontColor: '#90CDF4',
            fontSize: 9,
            autoSkip: true,
            beginAtZero: false,
            maxTicksLimit: 6,
            min: 1,
            maxRotation: 0,
          }
        }],
        yAxes: [{
          gridLines: {
            display: false,
            tickMarkLength: 5
          },
          ticks: {
            fontColor: '#90CDF4',
            fontSize: 9,
            autoSkip: true,
            beginAtZero: true,
            maxTicksLimit: 5,
            labelOffset: 3,
            padding: 5,
            suggestedMax: this.maxTime,
            stepSize: this.stepSize,
          }
        }]
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {
        displayColors: false,
        callbacks: {
          title: (tooltipItem) => {
            return 'Try n°' + tooltipItem[0]['xLabel']
          },
          label: (tooltipItem, data) => {
            return 'Time: ' + (data['datasets'][0]['data'][tooltipItem['index']]) + 's'
          }
        }
      }
    })
  }
}