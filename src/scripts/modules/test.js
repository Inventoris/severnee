class Test {
  constructor(questions, grades, tips) {
    this.questions = questions
    this.grades = grades
    this.tips = tips
    this.answers = new Object()
    this.questionNumber = 1
  }

  Next(question, answer, buttons, progress) {
    this.answers[this.questionNumber - 1] = {
      answerType: answer
    }

    this.questionNumber++

    if (this.questionNumber < 8) {
      question.textContent = this.questions[this.questionNumber - 1]
      progress.textContent = `${this.questionNumber}/7`
    } else {
      this.End(question, buttons, progress)
    }
  }

  End(question, buttons, progress) {
    let questionIndexes = new Array()

    for (let answer in this.answers) {
      if (this.answers[answer].answerType === 'disagree') {
        questionIndexes.push(answer)
      }
    }

    switch (true) {
      case (questionIndexes.length === 0):
        question.textContent = this.grades[0]
        break
      case (3 > questionIndexes.length > 0):
        question.textContent = this.grades[1]
        break
      case (questionIndexes.length > 3):
        question.textContent = this.grades[2]
        break
      default:
        question.textContent = this.grades[1]
        break
    }

    buttons.forEach(button => button.classList.add('answer-button_hidden'))

    const answersWrapper = document.querySelector('.test__answers')
    answersWrapper.classList.add('test__answers_test-finished')

    progress.textContent = 'Финиш'

    const doneIcon = document.querySelector('.done-icon')
    doneIcon.classList.replace('done-icon_hidden', 'done-icon_visible')

    let answerNumber = 1

    for (let questionIndex of questionIndexes) {
      const newParagraph = document.createElement('p')

      newParagraph.textContent = `${answerNumber}. ${this.tips[questionIndex]}`

      if (questionIndexes.length === 1) {
        newParagraph.textContent = this.tips[questionIndex]
      }

      answersWrapper.appendChild(newParagraph)
      answerNumber++
    }

    const testInner = document.querySelector('.test__inner')
    testInner.classList.add('test__inner_test-finished')
  }
}

const questions = [
  'У вас будет автомобиль? &#128663',
  'Уже знаете места для наблюдений за сиянием?',
  'Прочли гайды, как сделать хорошие фотографии?',
  'Погоду обещают ясную?',
  'Прогноз КП-индексов хороший?',
  'Взяли теплую одежду?',
  'А еду и горячие напитки?'
]

const grades = [
  'Вы молодец, можете сами стать гидом',
  'Неплохо, но есть над чем поработать',
  'Вы полны энтузиазма, но подготовка хромает'
]

const tips = [
  'С машиной лучше. Можно греться и уехать от туч',
  'Если выбрать места для наблюдений заранее, не придётся их искать посреди ночи',
  'Приятнее, когда можно фотографировать сияние сразу, а не разбираться на месте',
  'Даже если прогноз хороший, тучи легко перекроют вид. Стоит изучить прогноз облачности',
  'Если КП-индексы на дни поездки низкие, это не беда. Но с высокими шансов увидеть красивое сияние больше',
  'Без теплой одежды можно легко замерзнуть',
  'На холоде полезно иметь согревающие напитки, вроде чая или кофе, а еда поможет не терять силы'
]

const test = new Test(questions, grades, tips)

const question = document.querySelector('.question')
const progress = document.querySelector('.progress')
const buttons = document.querySelectorAll('.answer-button')

buttons.forEach(button => button.addEventListener('click', testHandler))

function testHandler(event) {
  const answer = event.target.id

  setTimeout(() => {
    test.Next(question, answer, buttons, progress)
  }, 70)
}
