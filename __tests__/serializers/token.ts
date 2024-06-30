/**
 * @file Snapshot Serializers - token
 * @module tests/serializers/token
 * @see https://vitest.dev/guide/snapshot
 */

import type { Token } from '#src/interfaces'
import inspect from '#tests/utils/inspect'
import isToken from '#tests/utils/is-token'
import { ok } from 'devlop'
import type { SnapshotSerializer } from 'vitest'

/**
 * Token snapshot serializer.
 *
 * @const {SnapshotSerializer} serializer
 */
const serializer: SnapshotSerializer = {
  /**
   * Print a snapshot value.
   *
   * @param {unknown} value - Value to print
   * @return {string} Snapshot value
   */
  print(value: unknown): string {
    ok(isToken(value), 'expected token')
    return inspect(value)
  },

  /**
   * Check if the given value is a {@linkcode Token}.
   */
  test: isToken
}

export default serializer
