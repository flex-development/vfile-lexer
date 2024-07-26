/**
 * @file Type Aliases - Chunk
 * @module vfile-lexer/types/Chunk
 */

import type Code from './code'

/**
 * A character code or slice of a buffer in the form of a string.
 *
 * @see {@linkcode Code}
 */
type Chunk = Code | string

export type { Chunk as default }
