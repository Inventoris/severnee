const arrow = document.querySelector('.intro__arrow')
const forecastSection = document.querySelector('.forecast')

arrow.addEventListener('click', () => {
  forecastSection.scrollIntoView()
})
