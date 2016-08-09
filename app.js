var questions = []

Function.prototype.guts = function(){
  return this.toString()
    .replace(/function\s\(\)\s?{/,'')
    .replace(/}$/,'')
    .replace(/`/g, "")
    .replace(/^\s+/g,'')
}

function describe(description, data){
  questions.push({
    description,
    init: data.init || function () { this.assertions = [] },
    starterCode: data.starterCode.guts(),
    tests: data.tests,
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
  document.q
}

function onCheckClick (question) {
    var solution = document.querySelector("[data-solution='"+question.index+"']").value
    if (typeof question.init == "function")question.init.call(question)
    try {
      eval(solution)
    }
    catch(e) {}
    question.tests.call(question)
    var results = document.querySelector("[data-results='"+question.index+"']")
    var source = document.getElementById("assertions").innerHTML
    var template = Handlebars.compile(source)
    results.innerHTML = template({assertions: question.assertions})
}
