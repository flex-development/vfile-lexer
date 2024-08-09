/**
 * @file Type Tests - Now
 * @module vfile-lexer/types/tests/unit-d/Now
 */

import type { Place } from '#src/interfaces'
import type { EmptyArray } from '@flex-development/tutils'
import type TestSubject from '../now'

describe('unit-d:types/Now', () => {
  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<EmptyArray>()
    })
  })

  describe('returns', () => {
    it('should return Place', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Place>()
    })
  })
})
