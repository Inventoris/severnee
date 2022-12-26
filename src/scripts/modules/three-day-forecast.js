const { daysChartBuilder } = require('./charts.js') // Функции для построения графиков

module.exports.threeDayForecastBuilder = (async () => {
  try {
    let response = await fetch('https://services.swpc.noaa.gov/text/3-day-forecast.txt') // Запрос трехдневного прогноза
    let textForecast = await response.text() // Ответ в текстовом формате
    let resultForecast = threeDayTablesFiller(textForecast) // Обработка прогнозов

    daysChartBuilder(resultForecast) // Рендер графиков
  } catch (error) {
    console.log(`Ошибка в получении трёхдневного прогноза: ${error}`)
  }
})()

function threeDayTablesFiller(data) {
  const startOfForecastTable = new RegExp('(00-03UT)', 'g') // Находит начало таблицы с KP-индексами
  const endOfForecastTable = new RegExp('\n\nRationale', 'g') // Находит конец таблицы
  const extraSignatures = new RegExp('[(]G[1-5][)]', 'g') // Находит лишние подписи, как «(G1)». Они дополнительно классифицируют силу геомагнитного шторма, но из-за них меняется число символов внутри response.text(), поэтому удаляем

  const indexOfStart = data.search(startOfForecastTable)
  const indexOfEnd = data.search(endOfForecastTable)
  let crudeForecast = data.slice(indexOfStart, indexOfEnd) // Вырезаем таблицу из response.text()

  if (crudeForecast.includes('G')) {
    crudeForecast = crudeForecast.replaceAll(extraSignatures, '    ') // Пробелы нужны, чтобы удалить элемент без сдвига
  }

  const resultForecast = crudeForecast
    .split(' ') // Создаём массив из таблицы для удобства
    .filter(item => item !== '')

  const firstDayChartData = new Array()
  const secondDayChartData = new Array()
  const thirdDayChartData = new Array()

  for (let i = 1; i < 30; i += 4) {
    firstDayChartData.push(Number(resultForecast[i]))
  }

  for (let j = 2; j < 31; j += 4) {
    secondDayChartData.push(Number(resultForecast[j]))
  }

  for (let c = 3; c < 32; c += 4) {
    thirdDayChartData.push(Number(resultForecast[c]))
  }

  return { firstDayChartData, secondDayChartData, thirdDayChartData } // Возвращаем готовые почасовые прогнозы на три дня для графиков
}
