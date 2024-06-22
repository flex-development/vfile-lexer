/**
 * @file Type Tests - Initializer
 * @module vfile-lexer/types/tests/unit-d/Initializer
 */

import type { TokenizeContext } from '#src/interfaces'
import type Effects from '../effects'
import type TestSubject from '../initializer'
import type State from '../state'

describe('unit-d:types/Initializer', () => {
  it('should match [this: TokenizeContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<TokenizeContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Effects]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Effects]>()
    })
  })

  describe('returns', () => {
    it('should return State', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<State>()
    })
  })
})
