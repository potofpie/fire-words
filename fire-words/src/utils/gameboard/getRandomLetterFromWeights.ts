export const getRandomLetterFromWeights = (probabilities: any)  => {
  var i, sum=0, r=Math.random();
  for (i in probabilities) {
    sum += probabilities[i].total;
    if (r <= sum) return i;
  }
}
