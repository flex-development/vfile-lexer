/**
 * @file Type Aliases - State
 * @module vfile-lexer/types/State
 */

import type { Code } from '@flex-development/vfile-reader'

/**
 * The main unit in the state machine: a function that gets a character code and
 * has certain effects.
 *
 * A state function returns another function: the next state-as-a-function to go
 * to, or `undefined` when a final state is reached.
 *
 * @see {@linkcode Code}
 *
 * @param {Code} code - Current character code
 * @return {State | undefined} Next state
 */
type State = (code: Code) => State | undefined

export type { State as default }
