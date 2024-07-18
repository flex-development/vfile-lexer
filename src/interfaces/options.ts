/**
 * @file Interfaces - Options
 * @module vfile-lexer/interfaces/Options
 */

import type { Constructs, FinalizeContext, TokenFactory } from '#src/types'
import type { Point } from '@flex-development/vfile-reader'
import type InitialConstruct from './construct-initial'

/**
 * Configuration options.
 */
interface Options {
  /**
   * Constructs.
   *
   * @see {@linkcode Constructs}
   */
  constructs?: Constructs | null | undefined

  /**
   * Finalize the tokenization context.
   *
   * @see {@linkcode FinalizeContext}
   */
  context?: FinalizeContext | null | undefined

  /**
   * Debug logger name.
   *
   * @default 'vfile-lexer'
   */
  debug?: string | null | undefined

  /**
   * Disabled construct names.
   */
  disabled?: readonly string[] | null | undefined

  /**
   * Point before first character in file.
   *
   * @see {@linkcode Point}
   *
   * @default { column: 1, line: 1, offset: 0 }
   */
  from?: Point | null | undefined

  /**
   * Initialization construct.
   *
   * @see {@linkcode InitialConstruct}
   */
  initialize?: InitialConstruct | null | undefined

  /**
   * Create a new token.
   *
   * @see {@linkcode TokenFactory}
   */
  token: TokenFactory
}

export type { Options as default }
