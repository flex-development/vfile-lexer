/**
 * @file Type Tests - Resolver
 * @module vfile-lexer/types/tests/unit-d/Resolver
 */

import type { TokenizeContext } from '#src/interfaces'
import type Event from '../event'
import type TestSubject from '../resolver'

describe('unit-d:types/Resolver', () => {
  describe('parameters', () => {
    it('should be callable with [Event[], TokenizeContext]', () => {
      // Arrange
      type P = [Event[], TokenizeContext]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return Event[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Event[]>()
    })
  })
})
