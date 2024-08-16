/**
 * @file Type Aliases - TokenType
 * @module vfile-lexer/types/TokenType
 */

import type { TokenTypeMap } from '#src/interfaces'

/**
 * Union of registered token types.
 *
 * To register custom token types, augment {@linkcode TokenTypeMap}. They will
 * be added to this union automatically.
 */
type TokenType = Extract<keyof TokenTypeMap, string>

export type { TokenType as default }
