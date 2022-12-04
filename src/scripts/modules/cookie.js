(function сookieNotify(){
  const dateOfNotification = localStorage.dateOfNotification
  const cookieNotification = document.querySelector('.cookie-notification')
  const cookieAgreeButton = document.querySelector('.cookie-notification__button')
  const YEAR_DURATION = 31536000000

  if (!dateOfNotification || dateOfNotification >= dateOfNotification + YEAR_DURATION) {
    cookieNotification.classList.replace('notification_hidden', 'notification_visible')

    cookieAgreeButton.addEventListener('click', () => {
      localStorage.setItem('dateOfNotification', new Date())
      cookieNotification.classList.replace('notification_visible', 'notification_hidden')
    })
  }
})()
