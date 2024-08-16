/**
 * @file Type Aliases - ReturnHandle
 * @module vfile-lexer/types/ReturnHandle
 */

import type { Construct } from '#src/interfaces'
import type Info from './info'

/**
 * Successful construct callback.
 *
 * @see {@linkcode Construct}
 * @see {@linkcode Info}
 *
 * @param {Construct} construct - Successful construct
 * @param {Info} info - Info passed around
 * @return {undefined} Nothing
 */
type ReturnHandle = (construct: Construct, info: Info) => undefined

export type { ReturnHandle as default }
