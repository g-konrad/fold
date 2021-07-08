import { INIL, ISTR, IAPPEND, IINDENT, INEWLINE } from './constants'

type Isequence = Inil | Istr | Iappend | Iindent | Inewline

type Inil = {
  readonly type: INIL
  readonly value: null
}

type Istr = {
  readonly type: ISTR
  readonly value: string
}

type Iappend = {
  readonly type: IAPPEND
  readonly value: readonly [Isequence, Isequence]
}

type Iindent = {
  readonly type: IINDENT
  readonly value: Isequence
}

type Inewline = {
  readonly type: INEWLINE
  readonly value: Isequence
}

export { Isequence, Inil, Istr, Iappend }
