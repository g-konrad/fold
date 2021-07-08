import type { CoreProgram } from './types'
import { variable, application } from './factories'

// prelude :: CoreProgram
const prelude: CoreProgram = [
  ['I', ['x'], variable('x')],
  ['K', ['x', 'y'], variable('x')],
  ['K1', ['x', 'y'], variable('y')],
  [
    'S',
    ['f', 'g', 'x'],
    application(application(variable('f'))(variable('x')))(application(variable('g'))(variable('x'))),
  ],
  [
    'compose',
    ['f', 'g', 'x'],
    application(variable('f'))(application(variable('g'))(variable('x'))),
  ],
  [
    'twice',
    ['f'],
    application(application(variable('compose'))(variable('f')))(variable('f')),
  ],
]

export default prelude
