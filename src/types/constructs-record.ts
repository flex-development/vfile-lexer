/**
 * @file Type Aliases - RecordConstructs
 * @module vfile-lexer/types/RecordConstructs
 */

import type { Construct } from '#src/interfaces'

/**
 * A single construct or list of constructs.
 *
 * @see {@linkcode Construct}
 */
type RecordConstructs = Construct | Construct[]

export type { RecordConstructs as default }
