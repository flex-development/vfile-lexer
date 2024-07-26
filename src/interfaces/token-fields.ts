/**
 * @file Interfaces - TokenFields
 * @module vfile-lexer/interfaces/TokenFields
 */

/**
 * Token fields registry.
 *
 * This interface can be augmented to register custom token fields.
 *
 * @example
 *  declare module '@flex-development/vfile-lexer' {
 *    interface TokenFields {
 *      value?: string | null
 *    }
 *  }
 */
interface TokenFields {}

export type { TokenFields as default }
