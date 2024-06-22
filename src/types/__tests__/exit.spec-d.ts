/**
 * @file Type Tests - Exit
 * @module vfile-lexer/types/tests/unit-d/Exit
 */

import type { Token } from '#src/interfaces'
import type TestSubject from '../exit'
import type TokenType from '../token-type'

describe('unit-d:types/Exit', () => {
  describe('parameters', () => {
    it('should be callable with [TokenType]', () => {
      // Arrange
      type P = [TokenType]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return Token', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Token>()
    })
  })
})
