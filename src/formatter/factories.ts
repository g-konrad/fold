import type { Int } from '../lang/types'
import type { Iappend, Isequence, Istr } from './types'
import { IAPPEND, IINDENT, INEWLINE, INIL, ISTR } from './constants'

// inil :: Isequence
const inil: Isequence = ({ type: INIL, value: null })

// istr :: String -> Isequence
const istr = (s: string): Isequence =>
  ({ type: ISTR, value: s })

// iappend :: Isequence -> Isequence -> Isequence
const iappend = (i1: Isequence) => (i2: Isequence): Isequence =>
  ({ type: IAPPEND, value: [i1, i2] })

// iindent :: Isequence -> Isequence
const iindent = (i: Isequence): Isequence =>
  ({ type: IINDENT, value: i })

// inewline :: Isequence
const inewline: Isequence = ({ type: INEWLINE, value: istr ('\n') })

// iconcat :: [Isequence] -> Isequence
const iconcat = (s: readonly Isequence[]): Isequence =>
  s.reduce ((acc, cur) => iappend (acc) (cur), inil)

// iinterleave :: Isequence -> [Isequence] -> Isequence
const iinterleave = (sep: Isequence) => (ss: readonly Isequence[]): Isequence =>
  ss.length === 0
    ? inil
    : ss.reduce ((acc, cur) => iappend (acc) (iappend (sep) (cur)), inil)

// flatten :: Int -> [(Isequence, Int)] -> String
const flatten = (col: Int) => (is: ReadonlyArray<readonly [Isequence, Int]>): string => {
  if (is.length === 0) return ''
  else if (is[0][0].type === INIL) return flatten (col) (is.slice (1))
  else if (is[0][0].type === ISTR) return (is[0][0] as Istr).value.concat (flatten (col) (is.slice (1)))
  else if (is[0][0].type === INEWLINE) return '\n'.concat (' '.repeat (is[0][1])).concat (flatten (is[0][1]) (is.slice (1)))
  else if (is[0][0].type === IINDENT) return flatten (col) ([[is[0][0], col], ...is.slice (1)])
  else return flatten (col) ([(is[0][0] as Iappend).value.map (s => [s, col]), ...is.slice (1)])
}

// idisplay :: Isequence -> String
const idisplay = (s: Isequence): string =>
  flatten (0) ([[s, 0]])

export { inil, istr, iappend, inewline, iindent, idisplay, iconcat, iinterleave, flatten }
