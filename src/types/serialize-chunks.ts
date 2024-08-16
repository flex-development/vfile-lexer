/**
 * @file Type Aliases - SerializeChunks
 * @module vfile-lexer/types/SerializeChunks
 */

import type Chunk from './chunk'

/**
 * Get the string value of a slice of `chunks`.
 *
 * @see {@linkcode Chunk}
 *
 * @param {Chunk[]} chunks - Chunks to serialize
 * @param {boolean | null | undefined} [expandTabs] - Expand tabs?
 * @return {string} String value of `chunks`
 */
type SerializeChunks = (
  chunks: Chunk[],
  expandTabs?: boolean | null | undefined
) => string

export type { SerializeChunks as default }
