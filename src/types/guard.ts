/**
 * @file Type Aliases - Guard
 * @module vfile-lexer/types/Guard
 */

import type { TokenizeContext } from '#src/interfaces'
import type { Code } from '@flex-development/vfile-reader'

/**
 * Check the given character `code`.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Character code to check
 * @return {boolean} `true` if `code` passes check
 */
type Guard = (this: TokenizeContext, code: Code) => boolean

export type { Guard as default }
