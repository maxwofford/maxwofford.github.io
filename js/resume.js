'use strict'

let currentStep
let size
let startingCells = [[1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],[11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],[14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],[17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],[22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],[25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4]]

Array.prototype.unique = function() {
  let a = this.concat()
  for(let i=0; i<a.length; ++i) {
    for(let j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1)
    }
  }
  return a
}

let Step = function() {
  this.cells = []

  this.draw = function() {
    this.cells.forEach((cell) => {
      let x = parseInt(cell.split(':')[0])
      let y = parseInt(cell.split(':')[1])

      // Greyscale version
      // Assumes p5.js is using RGB
      // fill(230 + random(10))
      // stroke(225)

      // Rainbow version
      // Assumes p5.js is using HSB
      fill(x + y, random(10) + 5, random(10) + 235)
      stroke(x + y, random(10) + 5, random(10) + 200)

      rect(size * x, size * y, size, size)
    })
  }

  this.addCells = function(cells) {
    this.cells = this.cells.concat(cells).unique()
  }

  this.killDistantCells = function() {
    this.cells.filter((cell) => {
      let x = parseInt(cell.split(':')[0])
      let y = parseInt(cell.split(':')[1])
      return !(Math.abs(x) > windowWidth / size || Math.abs(y) > windowHeight / size)
    })
  }

  this.getSurvivingCells = function() {
    return this.cells.filter((cell) => {
      let x = cell.split(':')[0]
      let y = cell.split(':')[1]
      let countAliveN = this.countAliveNeighbors(cell)

      return countAliveN == 3 || countAliveN == 2
    })
  }

  this.newCells = function() {
    let c = []
    let neighbors = this.getAllNeighbors()

    return neighbors.filter((neighbor) => {
      return this.countAliveNeighbors(neighbor) == 3
    })
  }

  this.countAliveNeighbors = function(pos) {
    return this.getNeighbors(pos).filter((cell) => {
      return this.cells.indexOf(cell) != -1
    }).length
  }

  this.getNeighbors = function(pos) {
    let x = parseInt(pos.split(':')[0])
    let y = parseInt(pos.split(':')[1])

    return [
      this.hash(x + 1, y),
      this.hash(x, y - 1),
      this.hash(x, y + 1),
      this.hash(x - 1, y),
      this.hash(x - 1, y - 1),
      this.hash(x - 1, y + 1),
      this.hash(x + 1, y - 1),
      this.hash(x + 1, y + 1)
    ]
  }

  this.getAllNeighbors = function() {
    let n = []

    this.cells.forEach((cell) => {
      n = n.concat(this.getNeighbors(cell))
    })

    return n.unique()
  }

  this.hash = function(x, y) {
    return x + ':' + y;
  }

  this.hasCell = function(x, y) {
    return this.cells.indexOf(this.hash(x,y)) != -1;
  }
}

function windowResized() {
  canvas = createCanvas(windowWidth, windowHeight)
  size = Math.min(windowWidth, windowHeight) / 70
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  size = Math.min(windowWidth, windowHeight) / 70
  colorMode(HSB, 100);
  frameRate(15)
  currentStep = new Step()
  startingCells.forEach((cell) => {
    currentStep.addCells(cell[0] + ':' + cell[1])
  })
}

function draw() {
  // Clear the canvas
  background(255)

  // Draw the current generation
  currentStep.draw()

  // Decide which cells to have next generation
  let survivingCells = currentStep.getSurvivingCells()
  let newCells = currentStep.newCells()

  // Add cells to the next generation
  let futureStep = new Step()
  futureStep.addCells(survivingCells)
  futureStep.addCells(newCells)
  futureStep.killDistantCells()

  // Step forward a generation
  currentStep = futureStep
}
