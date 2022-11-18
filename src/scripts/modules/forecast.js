const { daysChartBuilder, monthChartBuilder } = require('./charts.js') // Функции для построения графиков

module.exports.threeDayForecastBuilder = async () => {
  try {
    let response = await fetch('https://services.swpc.noaa.gov/text/3-day-forecast.txt') // Запрос трехдневного прогноза
    let textForecast = await response.text() // Ответ в текстовом формате
    let resultForecast = threeDayTablesFiller(textForecast) // Обработка прогнозов

    daysChartBuilder(resultForecast) // Рендер графика
  } catch (error) {
    console.log(error)
  }
}

module.exports.monthForecastBuilder = async () => {
  try {
    let response = await fetch('https://services.swpc.noaa.gov/text/27-day-outlook.txt')
    let textForecast = await response.text()
    let resultForecast = monthTableFiller(textForecast)

    monthChartBuilder(resultForecast)
  } catch (error) {
    console.log(error)
  }
}

function threeDayTablesFiller(data) {
  const startOfForecastTable = new RegExp('(00-03UT)', 'g') // Находит начало таблицы с KP-индексами
  const endOfForecastTable = new RegExp('Rationale', 'g') // Находит конец таблицы
  const extraSignatures = new RegExp('[(]G[1-5][)]', 'g') // Находит лишние подписи, как «(G1)». Они дополнительно классифицируют силу геомагнитного шторма, но из-за них меняется число символов внутри response.text(), поэтому удаляем

  const indexOfStart = data.search(startOfForecastTable)
  const indexOfEnd = data.search(endOfForecastTable)
  let crudeForecast = data.slice(indexOfStart, indexOfEnd) // Вырезаем таблицу из response.text()

  if (crudeForecast.includes('G')) {
    crudeForecast = crudeForecast.replaceAll(extraSignatures, '    ') // Пробелы нужны, чтобы удалить элемент без сдвига
  }

  const arrayFromTextForecast = crudeForecast // Создаём массив из таблицы для удобства
    .split(' ')
    .filter(item => item !== '')

  const indexOfLastElementOfTable = 32 // Индекс последнего нужного элемента в массиве из таблицы прогноза
  const resultForecast = arrayFromTextForecast
    .slice(0, indexOfLastElementOfTable) // Вырезаем только те данные, что нужны для формирования прогноза

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

  return { firstDayChartData, secondDayChartData, thirdDayChartData } // Возвращаем готовые прогнозы по дням для графиков
}

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
