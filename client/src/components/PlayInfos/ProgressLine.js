import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data'],
  data() {
    return {
      labelXAxis: []
    }
  },
  methods: {
    getLabelAndDatas() {
      this.labelXAxis = this.data.map((label, index) => index + 1)
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
        pointBorderWidth: 0

      }]
    }, {
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            borderDash: [6, 2],
            tickMarkLength: 10
          },
          ticks: {
            fontColor: '#90CDF4',
            fontSize: 9,
            labelOffset: 2,
            maxRotation: 0,
            suggestedMin: 0,
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#90CDF4',
            beginAtZero: false,
            suggestedMax: 400,
            suggestedMin: 0,
            maxTicksLimit: 5,
            stepSize: 25,
            fontSize: 9
          }
        }]
      },
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    })
  }
}