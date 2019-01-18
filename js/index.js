'use strict'

/*!
	devtools-detect
	Detect if DevTools is open
	https://github.com/sindresorhus/devtools-detect
	by Sindre Sorhus
	MIT License
*/
;(function() {
  'use strict'
  var devtools = {
    open: false,
    orientation: null
  }
  var threshold = 160
  var emitEvent = function(state, orientation) {
    window.dispatchEvent(
      new CustomEvent('devtoolschange', {
        detail: {
          open: state,
          orientation: orientation
        }
      })
    )
  }

  setInterval(function() {
    var widthThreshold = window.outerWidth - window.innerWidth > threshold
    var heightThreshold = window.outerHeight - window.innerHeight > threshold
    var orientation = widthThreshold ? 'vertical' : 'horizontal'

    if (
      !(heightThreshold && widthThreshold) &&
      ((window.Firebug &&
        window.Firebug.chrome &&
        window.Firebug.chrome.isInitialized) ||
        widthThreshold ||
        heightThreshold)
    ) {
      if (!devtools.open || devtools.orientation !== orientation) {
        emitEvent(true, orientation)
      }

      devtools.open = true
      devtools.orientation = orientation
    } else {
      if (devtools.open) {
        emitEvent(false, null)
      }

      devtools.open = false
      devtools.orientation = null
    }
  }, 500)

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = devtools
  } else {
    window.devtools = devtools
  }
})()
/* END DEVTOOLS-DETECT */

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

const animationArray = [
  ["\\", '|', '/', '-'],
  ["1", '2', '3', '4', '5', '6', '7'],
  ["\\", '|', '/', '-']
]
var commentInterval
var commentArray = []
commentArray = animationArray.map(_ => document.createComment(''))

function loadComment(consoleOpen) {
  if (consoleOpen) {
    if (!commentInterval) {
      commentArray.forEach(comment => document.prepend(comment))

      var count = 0
      commentInterval = setInterval(() => {
        /* animated comment code */
        commentArray.forEach((comment, index) => {
          const animation = animationArray[index]
          comment.textContent = animation[count % animation.length]
        })
        count++
      }, 2000)
    }
  } else {
    console.log('cleared interval #', commentInterval)
    clearInterval(commentInterval)
    commentInterval = null
    commentArray.forEach(comment => {
      comment.textContent = ''
      comment.remove()
    })
    console.log('deleted comments')
  }
}

function convertPage(consoleOpen = true) {
  loadCss(consoleOpen)
  document.title = consoleOpen ? '🏆' : 'Max Wofford'
  loadContent(consoleOpen)
  loadComment(consoleOpen)
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

document.addEventListener('DOMContentLoaded', function(event) {
  window.consoleState = false
  window.initialDetectedState = isConsoleOpen()
  checkLoop()
})
