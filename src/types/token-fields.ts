/**
 * @file Type Aliases - TokenFields
 * @module vfile-lexer/types/TokenFields
 */

import type { Token } from '#src/interfaces'

/**
 * Additional token fields.
 *
 * @see {@linkcode Token}
 */
type TokenFields = Omit<Token, 'type'>

export type { TokenFields as default }
