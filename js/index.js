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
    const p = document.createElement('p')
    p.innerHTML = "Hello there, here's your cookie 🍪"
    el.appendChild(p)
    const cookie = document.createElement('p')
    cookie.innerHTML = `lookingGlass=${new Date().getTime()}`
    el.appendChild(cookie)
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
    let open = false
    const div = document.createElement('div')
    Object.defineProperty(div, "id", {get: () => { open = true }})
    console.log(div, 'Sorry for the spam')
    setConsoleState(open)
    setTimeout(checkLoop, 200)
}

document.addEventListener("DOMContentLoaded", function(event) {
  window.consoleState = false
  checkLoop()
})
