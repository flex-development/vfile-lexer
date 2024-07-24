/**
 * @file Test Utilities - isPoint
 * @module tests/utils/isPoint
 */

import type { Point } from '@flex-development/vfile-location'

/**
 * Check if the specified `value` is a point.
 *
 * @see {@linkcode Point}
 *
 * @param {unknown} value - Value to check
 * @return {value is Point} `true` if `value` is point
 */
function isPoint(value: unknown): value is Point {
  return (
    typeof value === 'object' &&
    value !== null &&
    'column' in value &&
    'line' in value &&
    'offset' in value &&
    typeof value.column === 'number' &&
    typeof value.line === 'number' &&
    typeof value.offset === 'number'
  )
}

export default isPoint
