'use strict'

function loadCss(arg) {
  if (arg) {
    const el = document.createElement('link')
    el.setAttribute('href', 'css/index.css')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('type', 'text/css')
    el.setAttribute('id', 'injected-stylesheet')
    document.head.appendChild(el)
  } else {
    document.getElementById('injected-stylesheet').remove()
  }
}

function loadContent(arg) {
  if (arg) {
    const el = document.createElement('div')
    el.id = 'injected-content'
    document.body.appendChild(el)

    const addMessage = msg => {
      const p = document.createElement('p')
      p.innerHTML = msg
      el.appendChild(p)
    }

    addMessage("Hello there, here's your cookie 🍪")
    addMessage(`lookingGlass=${new Date().getTime()}`)
    addMessage("Please stand by, further instructions pending")
  } else {
    document.getElementById('injected-content').remove()
  }
}

function convertPage(arg = true) {
  loadCss(arg)
  document.title = arg ? '🏆' : 'MSW'
  loadContent(arg)
}

function setConsoleState(consoleState) {
  if (window.consoleState !== consoleState) {
    convertPage(consoleState)
    window.consoleState = consoleState
  }
}

function checkLoop() {
  const devtools = /./;
  let open = false
  devtools.toString = function() {
    open = true;
  }

  console.log('%c', devtools)
  const isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  setConsoleState(!isFF && open)
  setTimeout(checkLoop, 200)
}

document.addEventListener("DOMContentLoaded", function(event) {
  window.consoleState = false
  checkLoop()
})
