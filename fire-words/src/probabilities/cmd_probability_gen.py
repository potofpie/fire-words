import json
import unidecode
import json
from collections import defaultdict
import click

def no_alpha(w: str):
    return w.isalpha()
    
def strip(w: str):
    return unidecode.unidecode(w)

def empty_dict():
    return {"total": 0}

def re_normalize(_answer: dict):
    total_of_keys = sum([_answer[k]['total'] for k in _answer if k != "total"])  
    for k in _answer:
        if k == 'total':
            continue
        _answer[k]['total'] = _answer[k]['total']/total_of_keys
        if len(_answer[k].keys()) > 1:
            re_normalize(_answer[k])
            


def re_answer(_answer: dict, word: str, letter: str, w_index: int,  cursor: int, depth: int):
    if(not letter in _answer):
        _answer[letter] = {"total": 0}
    _answer[letter]['total'] += 1
    has_next_letter = (w_index + cursor)  < (len(word) - 1)
    has_next_ngram = cursor < depth  
    
    if( has_next_letter and has_next_ngram ):
        cursor+=1
        aws = _answer[letter]
        next_letter = word[w_index+cursor]
        return re_answer(aws, word, next_letter, w_index , cursor, depth)
    return _answer
        

@click.command()
@click.option('--input', default='english.txt')
@click.option('--depth', default=1)
def main(input, depth):
    word_string = ''
    with open(input, "r") as text_file:
        word_string = text_file.read()
    raw_words = word_string.split('\n')
    words = map(strip,filter(no_alpha, raw_words))
    answer = {}
    for w in words:
        cursor = 0
        for index, l in enumerate(w):
            re_answer(answer, w, l, index, cursor, depth)
    
    re_normalize(answer)
    
    
    with open("output.json", "w") as outfile:
        json.dump(answer, outfile)


if __name__ == "__main__":
    main()

