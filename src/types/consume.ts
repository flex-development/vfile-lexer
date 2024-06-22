/**
 * @file Type Aliases - Consume
 * @module vfile-lexer/types/Consume
 */

import type { Code } from '@flex-development/vfile-reader'

/**
 * Deal with a character `code` and move onto the next.
 *
 * @see {@linkcode Code}
 *
 * @param {Code} code - Character code to consume
 * @return {undefined} Nothing
 */
type Consume = (code: Code) => undefined

export type { Consume as default }
