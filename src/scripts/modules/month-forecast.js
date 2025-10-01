import { monthChartBuilder } from './charts.js'

(async () => {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/text/27-day-outlook.txt')
    const textForecast = await response.text()
    const resultForecast = monthTableFiller(textForecast)

    monthChartBuilder(resultForecast)
  } catch (error) {
    console.error(`Ошибка в создании месячного прогноза: ${error}`)
  }
})();

function monthTableFiller(data) {
  const startOfForecastTable = new RegExp('\\n2[0-9]+', 'g')
  const indexOfStart = data.search(startOfForecastTable)

  if (startOfForecastTable === -1) {
    throw new Error('Не удалось найти начало таблицы месячного прогноза')
  }

  const crudeForecast = data.slice(indexOfStart, data.length)
  const treatedForecast = crudeForecast
    .replaceAll(/\n+/g, '     ')    // Заменяем знаки разрыва строки на 5 пробелов
    .replaceAll(/\s{10}/g, '     ') // Заменяем места, где 10 пробелов, на 5 пробелов
    .trim()
    .split('     ')

  const monthChartData = []
  const monthChartLabels = []

  for (let i = 3; i < treatedForecast.length; i += 4) {
    const value = Number(treatedForecast[i])

    monthChartData.push(value)
  }

  for (let i = 0; i <= 105; i += 4) {
    monthChartLabels.push(treatedForecast[i])
  }

  const MONTHS_TRANSLATION = {
    Jan: 'Янв', Feb: 'Фев', Mar: 'Мар', Apr: 'Апр',
    May: 'Май', Jun: 'Июн', Jul: 'Июл', Aug: 'Авг',
    Sep: 'Сен', Oct: 'Окт', Nov: 'Ноя', Dec: 'Дек'
  }

  const translatedLabels = monthChartLabels.map((date) => {
    const engMonth = date.slice(5, 8)
    const ruMonth = MONTHS_TRANSLATION[engMonth]

    return date.slice(5).replace(engMonth, ruMonth)
  })

  return { monthChartData, translatedLabels }
}
