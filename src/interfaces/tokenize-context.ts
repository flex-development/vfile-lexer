/**
 * @file Interfaces - TokenizeContext
 * @module vfile-lexer/interfaces/TokenizeContext
 */

import type { Event } from '#src/types'
import type {
  Code,
  CodeCheckFactory,
  CodeReader
} from '@flex-development/vfile-reader'
import type Construct from './construct'
import type Token from './token'

/**
 * Context object to assist with tokenization.
 */
interface TokenizeContext {
  /**
   * Create a code check from a regular expression.
   *
   * @see {@linkcode CodeCheckFactory}
   */
  check: CodeCheckFactory

  /**
   * Get the current character code.
   *
   * @see {@linkcode Code}
   *
   * @return {Code} Current character code
   */
  get code(): Code

  /**
   * Current construct.
   *
   * @see {@linkcode Construct}
   */
  construct?: Construct | null | undefined

  /**
   * All constructs.
   *
   * @see {@linkcode Construct}
   */
  constructs: readonly Construct[]

  /**
   * Disabled construct names.
   */
  disabled: readonly string[]

  /**
   * Current list of events.
   *
   * @see {@linkcode Event}
   */
  events: Event[]

  /**
   * Check if the file contains the given search value, relative to the current
   * reader position.
   *
   * @see {@linkcode CodeReader.includes}
   */
  includes: CodeReader['includes']

  /**
   * Boolean indicating the a construct is interrupting another construct.
   */
  interrupt?: boolean | null | undefined

  /**
   * Get the next character code.
   *
   * @see {@linkcode Code}
   *
   * @return {Code} Next character code
   */
  get next(): Code

  /**
   * Get the current point in the file.
   *
   * @see {@linkcode CodeReader.now}
   */
  now: CodeReader['now']

  /**
   * Get the next `k`-th code point from the file without changing the position
   * of the reader, with `null` denoting end of file.
   *
   * @see {@linkcode CodeReader.peek}
   */
  peek: CodeReader['peek']

  /**
   * Get the previous character code.
   *
   * @see {@linkcode Code}
   *
   * @return {Code} Previous character code
   */
  get previous(): Code

  /**
   * Convert the specified sequence of character codes to a string.
   *
   * @see {@linkcode CodeReader.serialize}
   */
  serialize: CodeReader['serialize']

  /**
   * Get the character codes spanning the specified range without changing the
   * position of the reader.
   *
   * @see {@linkcode CodeReader.slice}
   */
  slice: CodeReader['slice']

  /**
   * Get the text spanning the specified range without changing the position of
   * the reader.
   *
   * @see {@linkcode CodeReader.sliceSerialize}
   */
  sliceSerialize: CodeReader['sliceSerialize']

  /**
   * Current tail token.
   *
   * @see {@linkcode Token}
   */
  get token(): Readonly<Token>
}

export type { TokenizeContext as default }
