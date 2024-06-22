/**
 * @file Type Tests - Attempt
 * @module vfile-lexer/types/tests/unit-d/Attempt
 */

import type TestSubject from '../attempt'
import type Constructs from '../constructs'
import type State from '../state'

describe('unit-d:types/Attempt', () => {
  describe('parameters', () => {
    it('should be callable with [Constructs, State?, State?]', () => {
      // Arrange
      type P = [Constructs, State?, State?]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return State', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<State>()
    })
  })
})
