export const randomLetter = () => {
    const vowels = 'AEIOU'
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
    const randomCharacter = Math.random() < 0.35 ? vowels[Math.floor(Math.random() * vowels.length)] : consonants[Math.floor(Math.random() * consonants.length)]
    return randomCharacter
  }


  