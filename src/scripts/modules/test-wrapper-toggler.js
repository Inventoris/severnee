const testWrapper = document.querySelector('.test__wrapper')
const testButton = document.querySelector('.test__button')
const isMobile = window.matchMedia('(max-width: 1024px)').matches

testButton.addEventListener('click', () => {
  testWrapper.classList.toggle('test__wrapper_opened')
  testWrapper.classList.toggle('test__wrapper_closed')

  const isOpened = testWrapper.classList.contains('test__wrapper_opened')

  if (isOpened) {
    testButton.textContent = 'Свернуть -'
  } else {
    testButton.textContent = 'Развернуть +'
  }
})

if (isMobile) {
  testWrapper.classList.replace('test__wrapper_opened', 'test__wrapper_closed')
  testButton.textContent = 'Развернуть +'
}
