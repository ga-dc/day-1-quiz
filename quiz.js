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

describe("fix the following html", function(){

})