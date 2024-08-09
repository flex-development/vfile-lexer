/**
 * @file Type Tests - Restore
 * @module vfile-lexer/types/tests/unit-d/Restore
 */

import type { EmptyArray } from '@flex-development/tutils'
import type TestSubject from '../restore'

describe('unit-d:types/Restore', () => {
  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<EmptyArray>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
