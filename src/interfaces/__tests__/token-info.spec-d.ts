/**
 * @file Type Tests - TokenInfo
 * @module vfile-lexer/interfaces/tests/unit-d/TokenInfo
 */

import type Position from '../position'
import type Token from '../token'
import type TokenFields from '../token-fields'
import type TestSubject from '../token-info'

describe('unit-d:interfaces/TokenInfo', () => {
  it('should extend Position', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Position>()
  })

  it('should extend TokenFields', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<TokenFields>()
  })

  it('should match [next?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('next')
      .toEqualTypeOf<Token | undefined>()
  })

  it('should match [previous?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('previous')
      .toEqualTypeOf<Token | undefined>()
  })
})
