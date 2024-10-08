/**
 * @file Type Tests - Token
 * @module vfile-lexer/interfaces/tests/unit-d/Token
 */

import type { TokenType } from '#src/types'
import type TestSubject from '../token'
import type TokenInfo from '../token-info'

describe('unit-d:interfaces/Token', () => {
  it('should extend TokenInfo', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<TokenInfo>()
  })

  it('should match [type: T]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('type')
      .toEqualTypeOf<TokenType>()
  })
})
