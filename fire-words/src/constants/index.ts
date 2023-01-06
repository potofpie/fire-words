export * from './emptyBoard'
import chroma from 'chroma-js'
import { TileData, Gameboard } from '../utils/gameboard'


export const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
export const DEBUG = true
export const ROWS_COUNT = Array.from(Array(5).keys())
export const LONG_COLUMN_COUNT = Array.from(Array(7).keys())
export const SHORT_COLUMN_COUNT = Array.from(Array(6).keys())
export const LONG_COLUMN_INDEXES = [1,3]


export const SELECTED_BORDER = '#e9d66b'
export const DEFAULT = '#f2f0e6'
export const ERROR = "#FF9694"
export const GREEN =  "#e9ffdb"
export const TEMPERATURE_COLORS = [ 
    ...chroma.scale(['#c4d8e2', '#f2f0e6' ]).mode('lch').colors(10), 
    ...chroma.scale(['#f2f0e6','#FF9694']).mode('lch').colors(10) 
]