/**
 * @file Type Aliases - SliceStream
 * @module vfile-lexer/types/SliceStream
 */

import type { Position } from '#src/interfaces'
import type Code from './code'

/**
 * Get the chunks spanning `range`.
 *
 * @see {@linkcode Code}
 * @see {@linkcode Token}
 *
 * @param {Position} range - Position in stream
 * @return {Code[]} List of chunks
 */
type SliceStream = (range: Position) => Code[]

export type { SliceStream as default }
