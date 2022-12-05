const { monthChartBuilder } = require('./charts.js') // Функции для построения графиков

module.exports.monthForecastBuilder = (async () => {
  try {
    let response = await fetch('https://services.swpc.noaa.gov/text/27-day-outlook.txt')
    let textForecast = await response.text()
    let resultForecast = monthTableFiller(textForecast)

    monthChartBuilder(resultForecast)
  } catch (error) {
    console.log(`Ошибка в получении 27-дневного прогноза: ${error}`)
  }
})()

function monthTableFiller(data) {
  const crudeForecast = data.slice(442, data.length)
  const treatedForecast = crudeForecast
    .split('  ')
    .filter(item => item !== '')

  const monthChartData = new Array()
  const monthChartLabels = new Array()

  for (let i = 3; i < treatedForecast.length; i += 3) {
    monthChartData.push(Number(treatedForecast[i].slice(0, 1))) // Заполняем массив KP-индексами. Метод slice нужен, поскольку каждый элемент цикла — склеенный KP-индекс и дата.
  }

  for (let i = 0; i <= 78; i += 3) {
    monthChartLabels.push(treatedForecast[i].slice(7)) // Заполняем массив лейблами для графика
  }

  const MONTHS_TRANSLATOR = {
    Jan: 'Янв',
    Feb: 'Фев',
    Mar: 'Мар',
    Apr: 'Апр',
    May: 'Май',
    Jun: 'Июн',
    Jul: 'Июл',
    Aug: 'Авг',
    Sep: 'Сен',
    Oct: 'Окт',
    Nov: 'Ноя',
    Dec: 'Дек'
  }

  const translatedLabels = monthChartLabels.map(label => {
    const engMonth = label.slice(0, 3)
    const ruMonth = MONTHS_TRANSLATOR[engMonth]

    return label.replace(engMonth, ruMonth)
  })

  return { monthChartData, translatedLabels } // Возвращаем готовый прогноз и лейблы
}
