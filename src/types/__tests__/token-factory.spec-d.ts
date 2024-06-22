/**
 * @file Type Tests - TokenFactory
 * @module vfile-lexer/types/tests/unit-d/TokenFactory
 */

import type { Token } from '#src/interfaces'
import type TestSubject from '../token-factory'
import type TokenFields from '../token-fields'
import type TokenType from '../token-type'

describe('unit-d:types/TokenFactory', () => {
  describe('parameters', () => {
    it('should be callable with [TokenType, TokenFields]', () => {
      // Arrange
      type P = [TokenType, TokenFields]

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
