import json
import requests
import string
import random
import unidecode
from collections import defaultdict

text_file = open('./english.txt')
test_string = text_file.read()
text_file.close()
raw_words = test_string.split('\n')


def no_alpha(w: str):
    return w.isalpha()
    
def strip(w):
    return unidecode.unidecode(w)
words = map(strip,filter(no_alpha, raw_words))


orders = {
    '1' : {}
}

for w in words:
    for _o in orders:
        o = int(_o)
        i= 0 
        n_grams = orders[_o]
        while i < len(w)-o:    
            letter = w[i+o]
            gram = w[i:i+o]
            ## for more than one thing a mabob
            if( not gram in n_grams ):
                n_grams[gram] = {}
            
            if not letter in n_grams[gram]:
                n_grams[gram][letter] = 0
                # n_grams[gram]['seen'] = 0
            
            
            # n_grams[gram]['seen']+=1
            n_grams[gram][letter]+=1
            i+=1


answer = orders['1']
for key in answer:
    total = 0
    prob = 0
    prob_total = 0
    for k in answer[key]:
        if(k == 'seen'):
            continue
        total+=answer[key][k]
    for k in answer[key]:
        if(k == 'seen'):
            continue
        answer[key][k] = answer[key][k]/total
        prob_total+=answer[key][k]
    print(prob_total)
    
        
            

with open("output.json", "w") as outfile:
    json.dump(answer, outfile)



# this was build for multiple n_grams but I am only using one
# If you redo this use dmilins idea 
# {
#   a: {
#     a: { total: 5 },
#     b: { total: 3 },
#     total: 8 
#   },
#   b: {
#     a: { total: 2 },
#     b: { total: 3 },
#     total: 5 
#   },
#   total: 13
# }