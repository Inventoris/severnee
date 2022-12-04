const testWrapper = document.querySelector('.test__wrapper')
const testButton = document.querySelector('.test__button')

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
