/**
 * @file Type Tests - Consume
 * @module vfile-lexer/types/tests/unit-d/Consume
 */

import type { Code } from '@flex-development/vfile-reader'
import type TestSubject from '../consume'

describe('unit-d:types/Consume', () => {
  describe('parameters', () => {
    it('should be callable with [Code]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code]>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<TestSubject>().returns.toBeUndefined()
    })
  })
})
