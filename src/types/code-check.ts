/**
 * @file Type Aliases - DefineSkip
 * @module vfile-lexer/types/DefineSkip
 */

import type Code from './code'

/**
 * Check whether a character code passes a test.
 *
 * @see {@linkcode Code}
 *
 * @param {Code} code - Character code to check
 * @return {boolean} `true` if `code` passes test
 */
type CodeCheck = (code: Code) => boolean

export type { CodeCheck as default }
