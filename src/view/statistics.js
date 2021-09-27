import SmartView from './smart';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderMoneyChart = (moneyCtx) => (
  new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
      datasets: [{
        data: [400, 300, 200, 160, 150, 100],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);

const createStatisticsTemplate = (points) => (
  `<section class="statistics">
<h2 class="">Trip statistics ${points.length}</h2>

<div class="statistics__item">
  <canvas class="statistics__chart" id="money" width="900"></canvas>
</div>

<div class="statistics__item">
  <canvas class="statistics__chart" id="type" width="900"></canvas>
</div>

<div class="statistics__item">
  <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
</div>
</section>`
);

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._data = {tripPoints: points};
    this._moneyChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data.tripPoints);
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('#money');
    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5; // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться

    this._moneyChart = renderMoneyChart(moneyCtx);
  }

  restoreHandlers() {
  }

}
