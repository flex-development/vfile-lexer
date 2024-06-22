/**
 * @file Type Aliases - Effects
 * @module vfile-lexer/types/Effects
 */

import type Attempt from './attempt'
import type Consume from './consume'
import type Enter from './enter'
import type Exit from './exit'

/**
 * Context object to transition the state machine.
 */
type Effects = {
  /**
   * Try to tokenize a construct.
   *
   * @see {@linkcode Attempt}
   */
  attempt: Attempt

  /**
   * Try to tokenize a construct, then revert.
   *
   * @see {@linkcode Attempt}
   */
  check: Attempt

  /**
   * Deal with a character code and move onto the next.
   *
   * @see {@linkcode Consume}
   */
  consume: Consume

  /**
   * Start a new token.
   *
   * @see {@linkcode Enter}
   */
  enter: Enter

  /**
   * Close an open token.
   *
   * @see {@linkcode Exit}
   */
  exit: Exit

  /**
   * Try to tokenize a construct, then revert.
   *
   * Sets `context.interrupt` to `true`.
   *
   * @see {@linkcode Attempt}
   */
  interrupt: Attempt
}

export type { Effects as default }
