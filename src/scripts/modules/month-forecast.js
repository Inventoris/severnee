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
  const startOfForecastTable = new RegExp('\n2[0-9]+', 'g')
  const indexOfStart = data.search(startOfForecastTable)

  const crudeForecast = data.slice(indexOfStart, data.length)
  const treatedForecast = crudeForecast
    .replaceAll(/\n+/g, '     ') // Заменяем знаки разрыва строки на 5 пробелов
    .replaceAll(/\s{10}/g, '     ') // Заменяем места, где 10 пробелов, на 5 пробелов
    .trim()
    .split('     ') // Создаём массив, разбивая строку по 5 пробелов

  const monthChartData = new Array()
  const monthChartLabels = new Array()

  for (let i = 3; i < treatedForecast.length; i += 4) {
    monthChartData.push(Number(treatedForecast[i])) // Заполняем массив KP-индексами
  }

  for (let i = 0; i <= 105; i += 4) {
    monthChartLabels.push(treatedForecast[i]) // Заполняем массив лейблами для графика
  }

  const MONTHS_TRANSLATION = {
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

  const translatedLabels = monthChartLabels.map(date => {
    const engMonth = date.slice(5, 8)
    const ruMonth = MONTHS_TRANSLATION[engMonth]

    return date.slice(5).replace(engMonth, ruMonth) // Очищаем от года, переводим название месяца на русский язык
  })

  return { monthChartData, translatedLabels } // Возвращаем готовый прогноз и лейблы
}
