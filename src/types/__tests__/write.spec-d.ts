/**
 * @file Type Tests - Write
 * @module vfile-lexer/types/tests/unit-d/Write
 */

import type Chunk from '../chunk'
import type Event from '../event'
import type TestSubject from '../write'

describe('unit-d:types/Write', () => {
  describe('parameters', () => {
    it('should be callable with [Chunk[]]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Chunk[]]>()
    })
  })

  describe('returns', () => {
    it('should return Event[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Event[]>()
    })
  })
})
