import { daysChartBuilder } from './charts.js'

(async () => {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/text/3-day-forecast.txt')
    const textForecast = await response.text()
    const resultForecast = threeDayTablesFiller(textForecast)

    daysChartBuilder(resultForecast)
  } catch (error) {
    console.error(`Ошибка в создании трёхдневного прогноза: ${error}`)
  }
})();

function threeDayTablesFiller(data) {
  const startOfForecastTable = data.indexOf('00-03UT')
  const endOfForecastTable = data.indexOf('\n\nRationale')

  // Находит лишние подписи, как «(G1)».
  // Они дополнительно классифицируют силу геомагнитного шторма,
  // но из-за них меняется число символов внутри response.text(),
  // поэтому нужно удалить
  const extraSignatures = new RegExp('[(]G[1-5][)]', 'g')

  if (startOfForecastTable === -1 || endOfForecastTable === -1) {
    throw new Error('Не удалось найти начало или конец таблицы трёхдневного прогноза')
  }

  let crudeForecast = data.slice(startOfForecastTable, endOfForecastTable)

  if (crudeForecast.includes('G')) {
    // Замена на пробелы нужна, чтобы удалить элемент без сдвига
    crudeForecast = crudeForecast.replaceAll(extraSignatures, '    ')
  }

  const resultForecast = crudeForecast
    .split(' ')
    .filter(item => item !== '')

  const firstDayChartData = []
  const secondDayChartData = []
  const thirdDayChartData = []

  for (let i = 1; i < 32; i++) {
    const value = Number(resultForecast[i])

    switch (i % 4) {
      case 1:
        firstDayChartData.push(value)
        break
      case 2:
        secondDayChartData.push(value)
        break
      case 3:
        thirdDayChartData.push(value)
        break
    }
  }

  return { firstDayChartData, secondDayChartData, thirdDayChartData }
}
