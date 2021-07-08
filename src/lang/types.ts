import { VARIABLE, NUMBER, CONSTRUCTOR, APPLICATION, LET, CASE, ALTERNATIVE, LAMBDA } from './constants'

type Name = string

type Int = number

type Variable = {
  readonly type: VARIABLE
  readonly value: Name
}

type Num = {
  readonly type: NUMBER
  readonly value: Int
}

type Constructor = {
  readonly type: CONSTRUCTOR
  readonly value: readonly [Int, Int]
}

type Application<T> = {
  readonly type: APPLICATION
  readonly value: {
    readonly left: Expression<T>
    readonly right: Expression<T>
  }
}

type Let<T> = {
  readonly type: LET
  readonly value: {
    readonly recursive: boolean
    readonly definitions: ReadonlyArray<readonly [T, Expression<T>]>
    readonly body: Expression<T>
  }
}

type Case<T> = {
  readonly type: CASE
  readonly value: {
    readonly expression: Expression<T>
    readonly alternatives: readonly [Alternative<T>]
  }
}

type Alternative<T> = {
  readonly type: ALTERNATIVE
  readonly value: readonly [Int, readonly T[], Expression<T>]
}

type Lambda<T> = {
  readonly type: LAMBDA
  readonly value: {
    readonly args: readonly T[]
    readonly expression: Expression<T>
  }
}

type Expression<T> = Variable
| Num
| Constructor
| Application<T>
| Let<T>
| Case<T>
| Lambda<T>

type Program<T> = ReadonlyArray<Supercombinator<T>>

type Supercombinator<T> = readonly [Name, readonly T[], Expression<T>]

type CoreSupercombinator = Supercombinator<Name>

type CoreProgram = Program<Name>

type CoreExpression = Expression<Name>

type CoreAlternative = Alternative<Name>

type CoreCase = Case<Name>

type CoreApplication = Application<Name>

type CoreLet = Let<Name>

type CoreLambda = Lambda<Name>

export { CoreExpression, CoreProgram, CoreLambda, CoreCase, CoreApplication, CoreLet, CoreSupercombinator, Variable, Num, Name, Int }
