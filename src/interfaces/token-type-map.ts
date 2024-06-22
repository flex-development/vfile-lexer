/**
 * @file Interfaces - TokenTypeMap
 * @module vfile-lexer/interfaces/TokenTypeMap
 */

import type { tt } from '#src/enums'

/**
 * Token type registry.
 *
 * This interface can be augmented to register custom token types.
 *
 * @example
 *  declare module '@flex-development/vfile-lexer' {
 *    interface TokenTypeMap {
 *      type: TokenType
 *    }
 *  }
 */
interface TokenTypeMap {
  eof: tt.eof
  sof: tt.sof
}

export type { TokenTypeMap as default }
