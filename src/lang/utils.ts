import { VARIABLE, NUMBER } from './constants'
import type { CoreExpression } from './types'

// bindersOf :: [(a, b)] -> [a]
const bindersOf = <A, B>(defns: ReadonlyArray<readonly [A, B]>): readonly A[] =>
  defns.map (([a, _]) => a)

// rhsOf :: [(a, b)] -> [b]
const rhsOf = <A, B>(defns: ReadonlyArray<readonly [A, B]>): readonly B[] =>
  defns.map (([_, b]) => b)

// isAtomicExpression :: CoreExpression -> Boolean
const isAtomicExpression = ({ type }: CoreExpression): boolean =>
  type === VARIABLE || type === NUMBER

export { bindersOf, rhsOf, isAtomicExpression }
