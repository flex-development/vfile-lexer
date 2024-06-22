/**
 * @file Type Aliases - ReturnHandle
 * @module vfile-lexer/types/ReturnHandle
 */

import type { Construct } from '#src/interfaces'

/**
 * Successful construct callback.
 *
 * @see {@linkcode Construct}
 *
 * @param {Construct} construct - Successful construct
 * @return {undefined} Nothing
 */
type ReturnHandle = (construct: Construct) => undefined

export type { ReturnHandle as default }
