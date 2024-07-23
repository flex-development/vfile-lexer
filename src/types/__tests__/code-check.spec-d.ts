/**
 * @file Type Tests - CodeCheck
 * @module vfile-reader/types/tests/unit-d/CodeCheck
 */

import type Code from '../code'
import type TestSubject from '../code-check'

describe('unit-d:types/CodeCheck', () => {
  describe('parameters', () => {
    it('should be callable with [Code]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code]>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})
