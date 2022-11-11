import Chart from 'chart.js/auto';

Chart.defaults.font.family = 'Roboto Mono, monospace'
Chart.defaults.font.size = 16
Chart.defaults.color = '#000000'

Chart.defaults.plugins.tooltip.titleFont = 300
Chart.defaults.plugins.tooltip.padding = 15
Chart.defaults.plugins.tooltip.displayColors = false
Chart.defaults.plugins.tooltip.intersect = false

const isMobile = window.matchMedia('(max-width: 1024px)').matches
let chartTitlesPadding = 15
let chartLabelFontSize = 18
let chartLineTension = 0.3

if (isMobile) {
  Chart.defaults.font.size = 12
  chartLabelFontSize = 14
  chartTitlesPadding = 5
  chartLineTension = 0.5
}

export function daysChartBuilder(forecasts) {
  const { firstDayChartData, secondDayChartData, thirdDayChartData } = forecasts

  const config1 = { // Прототип конфигов для графиков
    type: 'line',
    data: {
      datasets: [{
        label: 'Сегодня',
        data: firstDayChartData,
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: chartLabelFontSize
            }
          }
        }
      },
      elements: {
        line: {
          tension: chartLineTension,
          backgroundColor: '#77dd77',
          borderWidth: 1,
          fill: true
        },
        point: {
          pointStyle: 'star',
          pointRadius: 3,
          pointBorderColor: '#77dd77'
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'КП-индекс',
            padding: chartTitlesPadding
          },
          beginAtZero: true,
          max: 9,
          ticks: {
            stepSize: 1
          }
        },
        x: {
          title: {
            display: true,
            text: 'Время суток',
            padding: chartTitlesPadding
          },
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        }
      }
    }
  }

  const config2 = Object.create(config1, { // Создаём экземпляры прототипа config1 и перезаписываем data
    data: {
      writable: true,
      enumerable: true,
      value: {
        datasets: [{
          label: 'Завтра',
          data: secondDayChartData
        }]
      }
    }
  })

  const config3 = Object.create(config1, {
    data: {
      writable: true,
      enumerable: true,
      value: {
        datasets: [{
          label: 'Послезавтра',
          data: thirdDayChartData
        }]
      }
    }
  })

  try { // Рендеринг графиков на основе конфигов
    new Chart(
      document.getElementById('first-day-chart'),
      config1
    )
    new Chart(
      document.getElementById('second-day-chart'),
      config2
    )
    new Chart(
      document.getElementById('third-day-chart'),
      config3
    )
  } catch (error) {
    console.log(`Ошибка в рендеринге графиков на три дня: ${error}`)
  }
}

export function monthChartBuilder(chartParams) {
  const { monthChartData, translatedLabels } = chartParams

  const config = {
    type: 'bar',
    data: {
      labels: translatedLabels,
      datasets: [{
        label: 'Прогноз',
        data: monthChartData,
        backgroundColor: function(context) { // Добавляем раскраску в зависимости от величены KP-индекса
          const index = context.dataIndex
          const value = context.dataset.data[index]

          switch (true) {
            case (value === 1):
              return '#bdecb6'
            case (value === 2):
              return '#90ee90'
            case (value === 3):
              return '#2fc22f'
            case (value === 4):
              return '#008000'
            case (value === 5):
              return '#fcd50f'
            case (value === 6):
              return '#ff9900'
            case (value === 7):
              return '#a55ac4'
            case (value === 8):
              return '#8b00ff'
            case (value === 9):
              return '#48268c'
            default:
              return '#90ee90'
          }
        },
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'КП-индекс',
            padding: chartTitlesPadding
          },
          beginAtZero: true,
          max: 9,
          ticks: {
            stepSize: 1
          }
        },
        x: {
          title: {
            display: true,
            text: 'Даты',
            padding: chartTitlesPadding
          }
        }
      }
    }
  }

  try {
    new Chart(
      document.getElementById('month-chart'),
      config
    )
  } catch (error) {
    console.log(`Ошибка в рендеринге графиков на 27 дней: ${error}`)
  }
}
