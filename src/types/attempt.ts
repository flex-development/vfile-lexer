/**
 * @file Type Aliases - Attempt
 * @module vfile-lexer/types/Attempt
 */

import type Constructs from './constructs'
import type State from './state'

/**
 * Attempt deals with several constructs, and tries to tokenize according to
 * those constructs.
 *
 * If a construct results in `ok`, the tokens that were produced are used and
 * the `ok` state is switched to.
 *
 * If the result is `nok`, the attempt failed and the state machine reverts back
 * to its original state.
 *
 * @see {@linkcode Constructs}
 * @see {@linkcode State}
 *
 * @param {Constructs} construct - Construct(s) to try
 * @param {State?} [ok] - Successful tokenization state
 * @param {State?} [nok] - Failed tokenization state
 * @return {State} Next state
 */
type Attempt = (construct: Constructs, ok?: State, nok?: State) => State

export type { Attempt as default }
