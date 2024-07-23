/**
 * @file Type Tests - SliceSerialize
 * @module vfile-lexer/types/tests/unit-d/SliceSerialize
 */

import type { Position } from '#src/interfaces'
import type TestSubject from '../slice-serialize'

describe('unit-d:types/SliceSerialize', () => {
  describe('parameters', () => {
    it('should be callable with [Position, (boolean | null | undefined)?]', () => {
      // Arrange
      type P = [
        range: Position,
        expandTabs?: boolean | null | undefined
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})
