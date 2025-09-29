const menuButton = document.querySelector('.header__menu-button')
const menu = document.querySelector('.header__menu')

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('header__menu-button_clicked')
  menu.classList.toggle('header__menu_closed')
})

const closeMenu = () => {
  menuButton.classList.remove('header__menu-button_clicked')
  menu.classList.add('header__menu_closed')
}

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu()
  }
})

menu.addEventListener('click', (event) => {
  if (event.target.matches('.menu-list__link')) {
    closeMenu()
  }
})
