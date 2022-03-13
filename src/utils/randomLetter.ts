export const randomLetter = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
    return randomCharacter
  }


  