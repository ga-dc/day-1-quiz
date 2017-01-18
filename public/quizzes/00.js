describe("Loop through a list of numbers and print each one to the console", {
  init: function(){
    this.numConsoleLogs = 0
    this.assertions = []
    this.cl = this.cl || console.log
    console.log = function(){
      this.numConsoleLogs++
      this.cl.apply(console, arguments)
    }.bind(this)
  },
  starterCode: function(){
var list = [1,9,2,8,3,7,4,6,5]
  },
  tests: function(){
    var solution = document.querySelector("[data-solution='"+this.index+"']").value
    expect(this,"console.log called 9 times", 9,this.numConsoleLogs)
    var numManualConsoleLogs = solution.match(/console.log/g) || []
    expect(this,"console.log was used in a loop", 1,numManualConsoleLogs.length)
  },
  solution: function(){
    var list = [1,9,2,8,3,7,4,6,5]
    list.forEach(function(item){
      console.log(item)
    })
  }
})

describe("fix the following html", {
  starterCode: function() {
    `<ul>
    <li><a href=''>About Me</li></a>
</ul>
    `
  },
  tests: function () {
    let solution = document.querySelector("[data-solution='"+this.index+"']").value
    let matches = solution.match(/li(.*)a(.*)a(.*)li(.*)/) || []

    expect(this, "Expects a to be nested inside li", true, matches.length > 0)

  }
})
describe("define a function named modulo that takes two arguments, it should return the remainder of dividing the second argument by the first", {
  starterCode: function () {
  },
  tests: function () {
    let solution = document.querySelector("[data-solution='"+this.index+"']").value
    var modulo
    try{
      eval(solution)
    } catch(e){}
    try {
      expect(this, "the function modulo to be defined", 'function', typeof modulo)
      expect(this, "when we divide 4 by 3, should return remainder 1 ", 1, modulo(3,4))
      expect(this, "when we divide 7 by 5, should return remainder 2 ", 2, modulo(5,7))
    } catch (e) {}
  }
})
describe("create an object", {
  starterCode: function () {
    // create a variable named pet, with the following properties and values:
// species - iguana
// gender - female
// age - 12
// name - godzilla
var pet = {
}
  },
  tests: function () {
    let solution = document.querySelector("[data-solution='"+this.index+"']").value
    try{
      eval(solution)
    } catch(e){}
    expect(this, "the variable pet should be an object", true, pet instanceof Object)
    expect(this, "the pet's species should be iguana", "iguana", pet.species)
    expect(this, "the pet's gender should be female", "female", pet.gender)
    expect(this, "the pet's age should be 12", 12, pet.age)
    expect(this, "the pet's name should be godzilla", "godzilla", pet.name)

  }
})
describe("write CSS for the following HTML", {
  starterCode: function () {
    `<div class='red-square'></div>
<!-- should be a red square -->
<div id='blue-circle'></div>
<!-- should be a blue circle -->
<style>
// write CSS code here
</style>
`
  },
  tests: function () {
    let solution = document.querySelector("[data-solution='"+this.index+"']").value
    let numIds = solution.match(/#blue-circle/) || []
    let numClasses = solution.match(/#blue-circle/) || []
    expect(this, "number of id selectors to be 1", 1, numIds.length)
    expect(this, "number of class selectors to be 1", 1, numIds.length)
  }
})
describe("Data Types and Conditionals", {
  starterCode: function(){
    // Create a variable named isRaining. Set it equal to true or false.
    // If isRaining is true, print "Bring an umbrella" to the console.
    // Otherwise, print "Bring some shades" to the console.
  },
  tests: function(){
    let solution = document.querySelector("[data-solution='"+this.index+"']").value
    var isRaining
    let matches = solution.match(/(if|else)/g)
    try{
      eval(solution)
    } catch(e){}
    expect(this, "the variable isRaining should be a boolean", true, typeof isRaining == "boolean")
    expect(this, "there is an if-else statement", true, matches && matches.length >= 2)
  }
})
describe("Selecting Elements", {
  starterCode: function(){
    // Define a function named getListItems that returns all the <li>'s on the page.
  },
  tests: function(){
    let solution = document.querySelector("[data-solution='"+this.index+"']").value
    var getListItems
    try{
      eval(solution)
    } catch(e){}
    var lis = getListItems()
    lis = lis || {}
    lis.constructor = lis.constructor || {}
    expect(this, "getListItems is a function", true, typeof getListItems == "function")
    expect(this, "return value of getListItems is a list of elements", "NodeList", lis.constructor.name)
    expect(this, "getListItems NodeList has a length of 3", 3, lis.length)
  }
})
