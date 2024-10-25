// Ensure the Utils object is defined
const Utils = {
  numbers: (config) => {
    return Array.from({ length: config.count }, () => Math.floor(Math.random() * (config.max - config.min + 1)) + config.min);
  },
  CHART_COLORS: {
    red: 'rgba(255, 99, 132, 1)',
    blue: 'rgba(54, 162, 235, 1)',
  },
  transparentize: (color, opacity) => {
    const alpha = Math.min(1, Math.max(0, opacity));
    return color.replace(/rgba?\(([^,]+),([^,]+),([^,]+),?([^,]*)?\)/, `rgba($1, $2, $3, ${alpha})`);
  }
};

const DATA_COUNT = 12;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: [['June', '2024'], 'July', 'August', 'September', 'October', 'November', 'December', ['January', '2025'], 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      fill: false,
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: Utils.numbers(NUMBER_CFG),
      fill: false,
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    }
  ]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart with Tick Configuration'
      }
    },
    scales: {
      x: {
        ticks: {
          callback: function(val, index) {
            return index % 2 === 0 ? this.getLabelForValue(val) : '';
          },
          color: 'red',
        }
      },
      y: {
        beginAtZero: true
      }
    }
  },
};


const myChart = new Chart(document.getElementById('myChart'), config);


const actions = [
  {
    name: 'Alignment: start',
    handler(chart) {
      chart.options.scales.x.ticks.align = 'start';
      chart.update();
    }
  },
  {
    name: 'Alignment: center (default)',
    handler(chart) {
      chart.options.scales.x.ticks.align = 'center';
      chart.update();
    }
  },
  {
    name: 'Alignment: end',
    handler(chart) {
      chart.options.scales.x.ticks.align = 'end';
      chart.update();
    }
  },
];
