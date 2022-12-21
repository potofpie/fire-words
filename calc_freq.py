import json
import requests
import string
import random

text_file = open('./dictionary.json')
data = json.load(text_file)
words = [t for t in data]
# test_string = text_file.read()
text_file.close()

orders = {
    '1' : {},
    '2' : {},
    '3' : {}
}


for w in words:
    # print(w)
    for _o in orders:
        o = int(_o)
        i= 0 
        n_grams = orders[_o]
        while i < len(w)-o:
            if(not w.isalpha()):
                break                
            letter = w[i+o]
            gram = w[i:i+o]
            if( not gram in n_grams ):
                n_grams[gram] = {}
            if not letter in n_grams[gram]:
                n_grams[gram][letter] = 0
            n_grams[gram][letter]+=1
            i+=1
# al = [l for l in orders['1']]
# al.sort()
# text_file = open('output.json')

with open("output.json", "w") as outfile:
    # json.dump(dictionary, outfile)
    json.dump(orders['1'], outfile)

# def jenny():
#     currGram = test_string[0:order]
#     r = currGram
#     for i in range(0, 10000):
#         posses = None
#         try:
#             posses = n_grams[currGram]
#         except:
#             break
#         # posses = n_grams.get('currGram')
#         # if not posses: break  
#         n = random.choice(posses)
#         r = r + n
#         currGram = r[len(r)-order:len(r)]
#     print(r)

# jenny()
