/**
 * @file Type Tests - FinalizeContext
 * @module vfile-lexer/types/tests/unit-d/FinalizeContext
 */

import type { TokenizeContext } from '#src/interfaces'
import type TestSubject from '../finalize-context'

describe('unit-d:types/FinalizeContext', () => {
  describe('parameters', () => {
    it('should be callable with [TokenizeContext]', () => {
      // Arrange
      type P = [TokenizeContext]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return TokenizeContext | null | undefined | void', () => {
      // Arrange
      type Expect = TokenizeContext | null | undefined | void

      // Expect
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Expect>()
    })
  })
})
