/**
 * @file Type Aliases - CreateInitialConstruct
 * @module vfile-lexer/types/CreateInitialConstruct
 */

import type { InitialConstruct } from '#src/interfaces'

/**
 * Create an initial construct.
 *
 * @see {@linkcode InitialConstruct}
 *
 * @return {InitialConstruct} Initial construct
 */
type CreateInitialConstruct = () => InitialConstruct

export type { CreateInitialConstruct as default }
