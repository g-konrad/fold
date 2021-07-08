import type { CoreLambda, CoreApplication, CoreExpression, CoreSupercombinator, CoreLet, Num, Variable, Name, CoreCase } from '../lang/types'
import type { Isequence } from './types'
import { APPLICATION, CASE, CONSTRUCTOR, LET, NUMBER, VARIABLE } from '../lang/constants'
import { isAtomicExpression } from '../lang/utils'
import { iappend, iindent, inewline, istr, iconcat, inil, iinterleave } from './factories'

// printExpression :: CoreExpression -> Isequence
const printExpression = (expr: CoreExpression): Isequence => {
  switch (expr.type) {
    case VARIABLE:
      return istr ((expr as Variable).value)
    case NUMBER:
      return istr ((expr as Num).value.toString ())
    case APPLICATION:
      return iappend (printExpression ((expr as CoreApplication).value.left)) (printAtomicExpression ((expr as CoreApplication).value.right))
    case LET:
      const lt = (expr as CoreLet).value
      const keyword = lt.recursive ? 'letrec' : 'let'
      return iconcat ([
        istr (keyword),
        inewline,
        istr (' '),
        iindent (printDefinitions (lt.definitions)),
        inewline,
        istr ('in '),
        printExpression (lt.body),
      ])
    case CONSTRUCTOR:
      return ''
    case CASE:
      const cs = (expr as CoreCase).value
      return iconcat ([
        istr ('case '),
        printExpression (cs.expression),
        istr ('of '),
        printAlternatives (cs.alternatives),
      ])
    default:
      // Lambda
      const lm = (expr as CoreLambda).value
      return iconcat ([
        istr ('\\'),
        iinterleave (istr (' ')) (lm.args.map (istr)),
        istr (' -> '),
        printExpression (lm.expression),
      ])
  }
}

// printAtomicExpression :: CoreExpression -> Isequence
const printAtomicExpression = (expr: CoreExpression): Isequence =>
  isAtomicExpression (expr)
    ? printExpression (expr)
    : iappend (istr ('(')) (iappend (printExpression (expr)) (istr (')')))

// printDefinitions :: [(Name, CoreExpression)] -> Isequence
const printDefinitions = (definitions: ReadonlyArray<readonly [Name, CoreExpression]>): Isequence =>
  iinterleave (iconcat ([istr (';'), inewline])) (definitions.map (printDefinition))

// printDefinition :: (Name, CoreExpression) -> Isequence
const printDefinition = ([name, expr]: readonly [Name, CoreExpression]): Isequence =>
  iconcat ([
    istr (name),
    istr (' = '),
    iindent (printExpression (expr)),
  ])

const printAlternatives = (s) => inil

// printProgram :: [CoreSupercombinator] -> Isequence
const printProgram = (program: readonly CoreSupercombinator[]): Isequence =>
  inil
