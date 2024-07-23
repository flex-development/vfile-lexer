/**
 * @file Type Aliases - TokenizeOptions
 * @module vfile-lexer/types/TokenizeOptions
 */

import type { Options, PreprocessOptions } from '#src/interfaces'

/**
 * Tokenize options.
 *
 * @see {@linkcode Options}
 * @see {@linkcode PreprocessOptions}
 */
type TokenizeOptions = Options & PreprocessOptions

export type { TokenizeOptions as default }
