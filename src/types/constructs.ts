/**
 * @file Type Aliases - Constructs
 * @module vfile-lexer/types/Constructs
 */

import type { ConstructRecord } from '#src/interfaces'
import type RecordConstructs from './constructs-record'

/**
 * A single construct, list of constructs, or several constructs mapped from
 * their initial codes.
 *
 * @see {@linkcode ConstructRecord}
 * @see {@linkcode RecordConstructs}
 */
type Constructs = ConstructRecord | RecordConstructs

export type { Constructs as default }
