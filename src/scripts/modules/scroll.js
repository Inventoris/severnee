const navLinks = document.querySelectorAll('.menu-list__link, .intro__arrow-down')

function scrollView(event) {
  event.preventDefault()

  document
    .querySelector(event.currentTarget.hash)
    .scrollIntoView()
}

navLinks.forEach((link) => link.addEventListener('click', scrollView))
