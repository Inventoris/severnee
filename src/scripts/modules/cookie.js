(function сookieNotify(){
  const notification = localStorage.cookieNotification

  if (!notification) {
    const cookieBanner = document.querySelector('.cookie-notification')
    const cookieButton = document.querySelector('.cookie-notification__button')

    cookieBanner.classList.replace('notification_hidden', 'notification_visible')

    cookieButton.addEventListener('click', () => {
      localStorage.setItem('cookieNotification', new Date())
      cookieBanner.classList.replace('notification_visible', 'notification_hidden')
    }, {once: true})
  }
})()
