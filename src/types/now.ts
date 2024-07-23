/**
 * @file Type Aliases - Now
 * @module vfile-lexer/types/Now
 */

import type { Place } from '#src/interfaces'

/**
 * Get the current point in the file.
 *
 * @see {@linkcode Place}
 *
 * @return {Place} Current place in file
 */
type Now = () => Place

export type { Now as default }
