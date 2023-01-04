

export const generateBoard = () => {
  console.log("weo")

  const [p1,p2,p3]  = lodash.range(3).map(() => {
    const x = lodash.random(4)
    const xIsEven = (x + 1) % 2 === 0
    const y = xIsEven ? lodash.random(6) : lodash.random(5);
    const letter = weightedRand2(probabilities) ?? ' '


    return {
      x,
      y,
      letter
    }
  })
  return [p1,p2,p3];



} 