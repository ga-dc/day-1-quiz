module.exports = function(solutions){
  var questions = {}
  solutions.forEach(function(solution){
    questions[solution.question] = questions[solution.question] || {};
    questions[solution.question].total = solution.assertions.length
    questions[solution.question].correct = solution.assertions.filter(function(assertion){
      return assertion.status == "pass";
    })
  })
  var score = 0
  var total = 0
  for (var q in questions){
    score += questions[q].correct.length
    total += questions[q].total
  }
  return score + "/" + total
}
