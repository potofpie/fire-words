import {Position} from '../types'

import chroma from 'chroma-js'
export const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
export const DEBUG = false
export const ROWS_COUNT = Array.from(Array(5).keys())
export const tutorialWord = [
    { letter: 'P', x:1, y:2 } as Position,
    { letter: 'O', x:2, y:1 } as Position,
    { letter: 'N', x:3, y:1 } as Position,
    { letter: 'Y', x:4, y:0 } as Position, 
] 
export const LONG_COLUMN_COUNT = Array.from(Array(7).keys())
export const SHORT_COLUMN_COUNT = Array.from(Array(6).keys())
export const LONG_COLUMN_INDEXES = [1,3]
export const tempColors = [ 
    ...chroma.scale(['#c4d8e2','#f2f0e6']).mode('lch').colors(10), 
    ...chroma.scale(['#f2f0e6','#e8ccd7']).mode('lch').colors(10) 
]