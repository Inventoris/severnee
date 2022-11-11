import { threeDayForecastBuilder, monthForecastBuilder } from './modules/forecast.js'

try {
  threeDayForecastBuilder()
  monthForecastBuilder()
} catch (error) {
  console.log(`Ошибка в файле index.js: ${error}`)
}
