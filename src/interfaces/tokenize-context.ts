/**
 * @file Interfaces - TokenizeContext
 * @module vfile-lexer/interfaces/TokenizeContext
 */

import type {
  Code,
  DefineSkip,
  Event,
  Now,
  SliceSerialize,
  SliceStream,
  TokenFactory,
  Write
} from '#src/types'
import type Construct from './construct'

/**
 * Context object to assist with tokenization.
 */
interface TokenizeContext {
  /**
   * Current character code.
   *
   * @see {@linkcode Code}
   */
  code: Code

  /**
   * The current construct.
   *
   * Constructs that are not `partial` are set here.
   *
   * @see {@linkcode Construct}
   */
  currentConstruct?: Construct | undefined

  /**
   * Define a skip.
   *
   * @see {@linkcode DefineSkip}
   */
  defineSkip: DefineSkip

  /**
   * List of events.
   *
   * @see {@linkcode Event}
   */
  events: Event[]

  /**
   * Boolean indicating a construct is interrupting another construct.
   */
  interrupt?: boolean | undefined

  /**
   * Next character code.
   *
   * @see {@linkcode Code}
   */
  next: Code

  /**
   * Get the current point in the file.
   *
   * @see {@linkcode Now}
   */
  now: Now

  /**
   * Previous character code.
   *
   * @see {@linkcode Code}
   */
  previous: Code

  /**
   * Get the text spanning the specified range without changing the position of
   * the reader.
   *
   * @see {@linkcode SliceSerialize}
   */
  sliceSerialize: SliceSerialize

  /**
   * Get the chunks spanning the specified range.
   *
   * @see {@linkcode SliceStream}
   */
  sliceStream: SliceStream

  /**
   * Token factory.
   *
   * @see {@linkcode TokenFactory}
   */
  token: TokenFactory

  /**
   * Write a slice of chunks.
   *
   * The eof code (`null`) can be used to signal the end of the stream.
   *
   * @see {@linkcode Write}
   */
  write: Write
}

export type { TokenizeContext as default }
