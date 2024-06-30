/**
 * @file Test Utilities - isToken
 * @module tests/utils/isToken
 */

import type { Token } from '#src/interfaces'
import isPoint from './is-point'

/**
 * Check if the specified `value` is a token.
 *
 * @see {@linkcode Token}
 *
 * @param {unknown} value - Value to check
 * @return {value is Token} `true` if `value` is token
 */
function isToken(value: unknown): value is Token {
  return (
    check(value) &&
    (value.next === undefined || check(value.next)) &&
    (value.previous === undefined || check(value.previous))
  )

  /**
   * Check if `value` is token like.
   *
   * @param {unknown} value - Value to check
   * @return {value is Token} `true` if `value` is token like
   */
  function check(value: unknown): value is Token {
    return (
      typeof value === 'object' &&
      value !== null &&
      'end' in value &&
      'type' in value &&
      'start' in value &&
      isPoint(value.end) &&
      isPoint(value.start) &&
      typeof value.type === 'string'
    )
  }
}

export default isToken
