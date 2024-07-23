/**
 * @file Type Aliases - FinalizeContext
 * @module vfile-lexer/types/FinalizeContext
 */

import type { TokenizeContext } from '#src/interfaces'
import type Lexer from '#src/lexer'

/**
 * Finalize the tokenization context.
 *
 * @see {@linkcode TokenizeContext}
 *
 * @this {Lexer}
 *
 * @param {TokenizeContext} base - Base context
 * @return {TokenizeContext | null | undefined} Final context
 */
type FinalizeContext = (
  this: Lexer,
  base: TokenizeContext
) => TokenizeContext | null | undefined

export type { FinalizeContext as default }
