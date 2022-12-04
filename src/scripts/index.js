const { cookie } = require('./modules/cookie.js')
const { menu } = require('./modules/menu.js')
const { scroll} = require('./modules/scroll.js')
const { threeDayForecastBuilder } = require('./modules/three-day-forecast.js')
const { monthForecastBuilder } = require('./modules/month-forecast.js')
const { testOpener } = require('./modules/test-opener.js')
const { test } = require('./modules/test.js')

try {
  threeDayForecastBuilder()
  monthForecastBuilder()
} catch (error) {
  console.log(`Ошибка в файле index.js: ${error}`)
}
