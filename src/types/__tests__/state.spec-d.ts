/**
 * @file Type Tests - State
 * @module vfile-lexer/types/tests/unit-d/State
 */

import type { Optional } from '@flex-development/tutils'
import type { Code } from '@flex-development/vfile-reader'
import type TestSubject from '../state'

describe('unit-d:types/State', () => {
  describe('parameters', () => {
    it('should be callable with [Code]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code]>()
    })
  })

  describe('returns', () => {
    it('should return State | undefined', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Optional<TestSubject>>()
    })
  })
})
