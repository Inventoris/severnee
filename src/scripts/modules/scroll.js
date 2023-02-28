const navLinks = document.querySelectorAll('.nav-link')

function scrollView(event) {
  const scrollTarget = document.querySelector(event.currentTarget.hash)

  event.preventDefault()
  scrollTarget.scrollIntoView()
}


navLinks.forEach(link => link.addEventListener('click', scrollView))
