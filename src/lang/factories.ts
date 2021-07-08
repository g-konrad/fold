import { APPLICATION, NUMBER, VARIABLE } from './constants'
import type { Variable, Num, CoreApplication, CoreExpression } from './types'

// variable :: String -> Variable String
const variable = (str: string): Variable =>
  ({ type: VARIABLE, value: str })

// num :: Int -> Num Int
const num = (n: number): Num =>
  ({ type: NUMBER, value: n })

// constructor :: Int -> Int -> Constructor Int Int
// application ::
const application = (left: CoreExpression) => (right: CoreExpression): CoreApplication =>
  ({ type: APPLICATION, value: { left, right } })

export { variable, num, application }
