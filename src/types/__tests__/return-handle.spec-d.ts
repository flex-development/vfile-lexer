/**
 * @file Type Tests - ReturnHandle
 * @module vfile-lexer/types/tests/unit-d/ReturnHandle
 */

import type { Construct } from '#src/interfaces'
import type Info from '../info'
import type TestSubject from '../return-handle'

describe('unit-d:types/ReturnHandle', () => {
  describe('parameters', () => {
    it('should be callable with [Construct, Info]', () => {
      // Arrange
      type P = [Construct, Info]

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
