/**
 * @file Type Tests - Enter
 * @module vfile-lexer/types/tests/unit-d/Enter
 */

import type { Token, TokenFields } from '#src/interfaces'
import type TestSubject from '../enter'
import type TokenType from '../token-type'

describe('unit-d:types/Enter', () => {
  describe('parameters', () => {
    it('should be callable with [TokenType, (TokenFields | null | undefined)?]', () => {
      // Arrange
      type P = [TokenType, (TokenFields | null | undefined)?]

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
