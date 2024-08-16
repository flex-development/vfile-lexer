/**
 * @file Type Aliases - ConstructPack
 * @module vfile-lexer/types/ConstructPack
 */

import type { Construct } from '#src/interfaces'

/**
 * A single construct or list of constructs.
 *
 * @see {@linkcode Construct}
 */
type ConstructPack = Construct | Construct[]

export type { ConstructPack as default }
