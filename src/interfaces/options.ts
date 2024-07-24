/**
 * @file Interfaces - Options
 * @module vfile-lexer/interfaces/Options
 */

import type {
  CodeCheck,
  Constructs,
  FinalizeContext,
  TokenFactory
} from '#src/types'
import type { u } from '@flex-development/unist-util-builder'
import type { Point } from '@flex-development/vfile-location'
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
   * Line ending code check.
   *
   * @see {@linkcode CodeCheck}
   */
  eol?: CodeCheck | null | undefined

  /**
   * Finalize the tokenization context.
   *
   * @see {@linkcode FinalizeContext}
   */
  finalizeContext?: FinalizeContext | null | undefined

  /**
   * Point before first character in file.
   *
   * @see {@linkcode Point}
   *
   * @default { column: 1, line: 1, offset: 0 }
   */
  from?: Point | null | undefined

  /**
   * Initial construct.
   *
   * @see {@linkcode InitialConstruct}
   */
  initialize?: InitialConstruct | null | undefined

  /**
   * Create a new token.
   *
   * @see {@linkcode TokenFactory}
   * @see {@linkcode u}
   *
   * @default u
   */
  token?: TokenFactory | null | undefined
}

export type { Options as default }
