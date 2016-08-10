module.exports = function(solutions){
  var questions = {}
  solutions.forEach(function(solution){
    questions[solution.question] = questions[solution.question] || {};
    questions[solution.question].correct = solution.assertions.filter(function(assertion){
      return assertion.status == "pass";
    })
  })
}
