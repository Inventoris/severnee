const questions = [
  'У вас будет свой транспорт?',
  'Уже выбрали места для наблюдений за сиянием?',
  'Изучили, как сделать хорошие фотографии ночью?',
  'Погоду обещают безоблачную?',
  'KP-индексы в дни поездки 3 и выше?',
  'Тёплая одежда с собой?',
  'А еда и горячие напитки?'
]

const grades = [
  'Всё в порядке, можно смело ехать. И добавить нечего.',
  'Неплохо, но есть над чем поработать:',
  'Вы полны энтузиазма, но подготовка хромает:'
]

const tips = [
  'Без своего транспорта почти никак. Можно греться или уехать из под внезапных туч',
  'Если выбрать места для наблюдений заранее, не придётся искать точку посреди кромешной тьмы',
  'Приятнее, когда можно фотографировать сияние сразу, а не разбираться на месте в настройках. Почитайте гайды или туториалы по ночной съёмке',
  'Даже если прогноз KP-индексов хороший, тучи легко перекроют весь вид. Планировать поездку стоит на ясные дни',
  'Если KP-индексы на дни поездки низкие, сияние будет выглядеть как беловатые разводы в небе, а не яркие зелёные волны',
  'Без теплой одежды можно легко замерзнуть, одевайтесь как на долгую прогулку',
  'На холоде приятно иметь согревающие напитки, вроде чая или кофе. А еда поможет не терять силы'
]

class Test {
  constructor(questions, grades, tips) {
    this.questions = questions
    this.grades = grades
    this.tips = tips
    this.answers = new Object()
    this.questionNumber = 0
    this.progressCount = 1
  }

  Next(question, answer, answerButtons, progress) {
    this.answers[this.questionNumber] = {
      answerType: answer
    }

    this.progressCount++
    this.questionNumber++

    if (this.questionNumber < 7) {
      question.textContent = this.questions[this.questionNumber]
      progress.textContent = `${this.progressCount}/7`
    } else {
      this.End(question, answerButtons, progress)
    }
  }

  End(question, answerButtons, progress) {
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

    answerButtons.forEach(button => button.classList.add('test__answer_hidden'))
    progress.textContent = 'Финиш'

    if (questionIndexes.length === 0) {
      return
    }

    const answersWrapper = document.querySelector('.test__answers')

    const testInner = document.querySelector('.test__inner')
    testInner.classList.add('test-finished')

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
  }
}

const test = new Test(questions, grades, tips)

const question = document.querySelector('.test__question')
const answerButtons = document.querySelectorAll('.test__answer')
const progress = document.querySelector('.test__progress')

answerButtons.forEach((button) => button.addEventListener('click', testHandler))

function testHandler(event) {
  const answer = event.target.id

  setTimeout(() => {
    test.Next(question, answer, answerButtons, progress)
  }, 50)
}
