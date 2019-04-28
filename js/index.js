'use strict'

// Could do cool things with this later. May as well start saving it now
if (!localStorage.getItem('firstContact')) {
  localStorage.setItem('firstContact', Date.now())
}

function loadCss(consoleOpen) {
  if (consoleOpen) {
    const el = document.createElement('link')
    el.setAttribute('href', 'css/injected.css')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('type', 'text/css')
    el.setAttribute('id', 'injected-stylesheet')
    document.head.appendChild(el)
  } else {
    document.getElementById('injected-stylesheet').remove()
  }
}

function loadContent(consoleOpen) {
  if (consoleOpen) {
    const el = document.createElement('div')
    el.id = 'injected-content'
    document.body.appendChild(el)

    const addMessage = msg => {
      const p = document.createElement('p')
      p.innerHTML = msg
      el.appendChild(p)
      return p
    }

    addMessage('glad you found me.')
    const wrapper = addMessage("I'm working on ")
    const glitch = document.createElement('p')
    glitch.innerHTML = 'Hack Club'
    wrapper.appendChild(glitch)
    glitch.className = 'glitch'
    glitch.onclick = () =>
      (location.href = 'https://hackclub.com?ref=maxwofford')
    addMessage('please, reach out.')
  } else {
    document.getElementById('injected-content').remove()
  }
}

function convertPage(consoleOpen = true) {
  loadCss(consoleOpen)
  document.title = consoleOpen ? '🏆' : 'Max Wofford'
  loadContent(consoleOpen)
}

function setConsoleState(consoleState) {
  if (window.consoleState !== consoleState) {
    convertPage(consoleState)
    window.consoleState = consoleState
  }
}

function isConsoleOpen() {
  let isOpen = false
  const devtools = /./
  devtools.toString = function() {
    isOpen = true
  }
  console.log('%c', devtools)

  // this detection method gives a false positive in Firefox
  // therefore it uses an alternative (and less accurate) method for FF
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
    isOpen = window.devtools.open
  return isOpen
}

function checkLoop() {
  // This flag is for disabling the easter egg in development
  switch (window.location.hash) {
    case '#disabled':
      break
    case '#enabled':
      setConsoleState(true)
      break
    default:
      setConsoleState(isConsoleOpen())
      setTimeout(checkLoop, 200)
      break
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.consoleState = false
  window.initialDetectedState = isConsoleOpen()
  checkLoop()

  document.querySelector("#title-name").addEventListener("keydown", function (e) {
    if (e.key === 'Enter' && e.target.innerText.trim() != '') {
      document.querySelector("#title-name")
      localStorage.setItem('username', e.target.innerText.trim())
      window.location.href = 'looking-glass'
    }
  }, false)
})