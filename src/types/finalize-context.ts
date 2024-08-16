/**
 * @file Type Aliases - FinalizeContext
 * @module vfile-lexer/types/FinalizeContext
 */

import type { TokenizeContext } from '#src/interfaces'

/**
 * Finalize the tokenize context.
 *
 * @see {@linkcode TokenizeContext}
 *
 * @param {TokenizeContext} base - Base tokenize context
 * @return {TokenizeContext | null | undefined} Final context
 */
type FinalizeContext = (
  base: TokenizeContext
) => TokenizeContext | null | undefined

export type { FinalizeContext as default }
