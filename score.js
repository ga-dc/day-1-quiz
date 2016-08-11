module.exports = function(solutions){
  var questions = {}
  solutions.forEach(function(solution){
    questions[solution.question] = questions[solution.question] || {};
    questions[solution.question].correct = solution.assertions.filter(function(assertion){
      return assertion.status == "pass";
    })
  })
  var score = 0
  for (var q in questions){
    score += questions[q].correct.length
  }
  return score
}
