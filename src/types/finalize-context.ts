/**
 * @file Type Aliases - FinalizeContext
 * @module vfile-lexer/types/FinalizeContext
 */

import type { TokenizeContext } from '#src/interfaces'

/**
 * Finalize the tokenization context.
 *
 * @see {@linkcode TokenizeContext}
 *
 * @param {TokenizeContext} context - Base context
 * @return {TokenizeContext | null | undefined | void} Final context
 */
type FinalizeContext = (
  base: TokenizeContext
) => TokenizeContext | null | undefined | void

export type { FinalizeContext as default }
