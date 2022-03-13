const fetchText = async (word: string) => {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    console.log(response.text())
    return response.status === 200
}

export const checkWord = async (word: string) => {
    return await fetchText(word)
} 