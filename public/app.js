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
    index: questions.length,
    next: questions.length + 1,
    prev: questions.length - 1,
    assertions: []
  })
}

function expect(context,description, expected, got){
  questions[context.index].assertions.push({
    status: expected == got ? "pass" : "fail",
    expected: expected,
    description: description,
    got: got
  })
}

function render(question){
  question.total = questions.length;
  if(question.index === (questions.length - 1) ){
    question.next = "last"
  }
  var source = document.getElementById("question").innerHTML
  var template = Handlebars.compile(source)
  document.querySelector(".questions").innerHTML += template(question)
}

function onCheckClick (question) {
    var solution = document.querySelector("[data-solution='"+question.index+"']").value
    if (typeof question.init == "function") question.init.call(question)
    try {
      eval(solution)
    }
    catch(e) {}
    question.tests.call(question)
    var results = document.querySelector("[data-results='"+question.index+"']")
    var source = document.getElementById("assertions").innerHTML
    var template = Handlebars.compile(source)
    results.innerHTML = template({assertions: question.assertions})
    var url = window.location.pathname + "/checkings"
    var data = {
      question: question.index,
      solution: solution,
      assertions: question.assertions,
      createdAt: Date.now()
    }
    $.post(url, data);
    var score = document.querySelector(".js-score")
    score.innerHTML = questions.map(function(question){
      return question.assertions.filter(function(assertion){
        return assertion.status == "pass"
      }).length
    }).reduce(function(a,b){
      return a + b
    }) + "/" + questions.map(function(question){
      return question.assertions.length
    }).reduce(function(a,b){
      return a + b
    })
}

var form = document.querySelector(".submit-quiz");
form.addEventListener("submit", function(e){
  e.preventDefault();
  form.setAttribute("action", window.location.pathname + "/submit");
  form.submit();
});
