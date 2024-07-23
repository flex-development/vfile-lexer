/**
 * @file Type Tests - Write
 * @module vfile-lexer/types/tests/unit-d/Write
 */

import type Code from '../code'
import type Event from '../event'
import type TestSubject from '../write'

describe('unit-d:types/Write', () => {
  describe('parameters', () => {
    it('should be callable with [Code[]]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code[]]>()
    })
  })

  describe('returns', () => {
    it('should return Event[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Event[]>()
    })
  })
})
