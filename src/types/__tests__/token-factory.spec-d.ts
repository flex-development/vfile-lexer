/**
 * @file Type Tests - TokenFactory
 * @module vfile-lexer/types/tests/unit-d/TokenFactory
 */

import type { Token, TokenInfo } from '#src/interfaces'
import type TestSubject from '../token-factory'
import type TokenType from '../token-type'

describe('unit-d:types/TokenFactory', () => {
  describe('parameters', () => {
    it('should be callable with [TokenType, TokenInfo]', () => {
      // Arrange
      type P = [TokenType, TokenInfo]

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
