/**
 * @file Type Aliases - Constructs
 * @module vfile-lexer/types/Constructs
 */

import type { Construct } from '#src/interfaces'

/**
 * A single construct, or a list of constructs.
 *
 * @see {@linkcode Construct}
 */
type Constructs = Construct | Construct[] | readonly Construct[]

export type { Constructs as default }
