var questions = []

Function.prototype.guts = function(){
  return this.toString()
    .replace(/function\s\(\){/,'')
    .replace(/}$/,'')
    .replace(/^\s+/g,'')
}

function describe(description, data){
  questions.push({
    description,
    init: data.init,
    starterCode: data.starterCode.guts(),
    tests: data.tests,
    solution: data.solution.guts(),
    index: questions.length
  })
}

function expect(context,description, expected, got){
  context.assertions = context.assertions || []
  context.assertions.push({
    status: expected == got ? "pass" : "fail",
    expected: expected,
    description: description,
    got: got
  })
}

function render(question){
  var source = document.getElementById("question").innerHTML
  var template = Handlebars.compile(source)
  document.querySelector(".questions").innerHTML += template(question)
  var checkr = document.querySelector("[data-tests='"+question.index+"']")
  checkr.addEventListener("click", function(event){
    var solution = document.querySelector("[data-solution='"+question.index+"']").value
    question.init.call(question)
    eval(solution)
    question.tests.call(question)
    console.dir(question.assertions)
    var results = document.querySelector("[data-results='"+question.index+"']")
    var source = document.getElementById("assertions").innerHTML
    var template = Handlebars.compile(source)
    results.innerHTML = template({assertions: question.assertions})
  })
}
