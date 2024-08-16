/**
 * @file Type Aliases - SliceSerialize
 * @module vfile-lexer/types/SliceSerialize
 */

import type { Position } from '#src/interfaces'

/**
 * Get the text spanning `range`.
 *
 * @see {@linkcode Position}
 *
 * @param {Position} range - Slice position
 * @param {boolean | null | undefined} [expandTabs] - Expand tabs?
 * @return {string} Serialized slice
 */
type SliceSerialize = (
  range: Position,
  expandTabs?: boolean | null | undefined
) => string

export type { SliceSerialize as default }
