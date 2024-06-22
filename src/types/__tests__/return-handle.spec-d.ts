/**
 * @file Type Tests - ReturnHandle
 * @module vfile-lexer/types/tests/unit-d/ReturnHandle
 */

import type { Construct } from '#src/interfaces'
import type TestSubject from '../return-handle'

describe('unit-d:types/ReturnHandle', () => {
  describe('parameters', () => {
    it('should be callable with [Construct]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Construct]>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
