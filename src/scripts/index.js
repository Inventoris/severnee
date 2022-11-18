const { threeDayForecastBuilder, monthForecastBuilder } = require('./modules/forecast.js')
const { scroll } = require('./modules/scroll.js')

try {
  threeDayForecastBuilder()
  monthForecastBuilder()
} catch (error) {
  console.log(`Ошибка в файле index.js: ${error}`)
}
