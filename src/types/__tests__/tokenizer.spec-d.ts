/**
 * @file Type Tests - Tokenizer
 * @module vfile-lexer/types/tests/unit-d/Tokenizer
 */

import type { TokenizeContext } from '#src/interfaces'
import type Effects from '../effects'
import type State from '../state'
import type TestSubject from '../tokenizer'

describe('unit-d:types/Tokenizer', () => {
  it('should match [this: TokenizeContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<TokenizeContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Effects, State, State]', () => {
      // Arrange
      type P = [Effects, State, State]

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
