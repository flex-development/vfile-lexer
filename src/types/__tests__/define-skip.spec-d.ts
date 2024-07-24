/**
 * @file Type Tests - DefineSkip
 * @module vfile-lexer/types/tests/unit-d/DefineSkip
 */

import type { Point } from '#src/interfaces'
import type TestSubject from '../define-skip'

describe('unit-d:types/DefineSkip', () => {
  describe('parameters', () => {
    it('should be callable with [Pick<Point, "column" | "line">]', () => {
      // Arrange
      type P = [Pick<Point, 'column' | 'line'>]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
