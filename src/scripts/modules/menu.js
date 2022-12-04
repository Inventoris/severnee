const menuIcon = document.querySelector('.menu__icon')
const menuList = document.querySelector('.menu__list')
const menuListLinks = document.querySelectorAll('.menu__list .nav-link')

menuIcon.addEventListener('click', menuSwitcher)

menuListLinks.forEach(link => {
  link.addEventListener('click', menuSwitcher)
})

function menuSwitcher() {
  menuIcon.classList.toggle('menu__icon_active')
  menuList.classList.toggle('menu__list_opened')
  menuList.classList.toggle('menu__list_closed')
}
