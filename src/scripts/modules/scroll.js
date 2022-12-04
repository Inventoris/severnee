const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach(link => link.addEventListener('click', (event) => {
  event.preventDefault()
  const scrollTarget = document.querySelector(link.hash)

  scrollTarget.scrollIntoView()
}))
