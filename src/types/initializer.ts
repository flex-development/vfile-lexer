/**
 * @file Type Aliases - Initializer
 * @module vfile-lexer/types/Initializer
 */

import type { TokenizeContext } from '#src/interfaces'
import type Effects from './effects'
import type State from './state'
import type Tokenizer from './tokenizer'

/**
 * Set up an initial state machine.
 *
 * > 👉 Like a {@linkcode Tokenizer}, but without `ok` and `nok`.
 *
 * @see {@linkcode Effects}
 * @see {@linkcode State}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects - Context object to transition state machine
 * @return {State} Initial state
 */
type Initializer = (this: TokenizeContext, effects: Effects) => State

export type { Initializer as default }
