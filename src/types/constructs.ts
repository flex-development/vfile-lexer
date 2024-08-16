/**
 * @file Type Aliases - Constructs
 * @module vfile-lexer/types/Constructs
 */

import type { ConstructRecord } from '#src/interfaces'
import type ConstructPack from './construct-pack'

/**
 * A single construct, list of constructs, or several constructs mapped from
 * their initial codes.
 *
 * @see {@linkcode ConstructPack}
 * @see {@linkcode ConstructRecord}
 */
type Constructs = ConstructRecord | ConstructPack

export type { Constructs as default }
