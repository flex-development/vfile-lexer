/**
 * @file Type Tests - TokenInfo
 * @module vfile-lexer/interfaces/tests/unit-d/TokenInfo
 */

import type Position from '../position'
import type TokenFields from '../token-fields'
import type TestSubject from '../token-info'

describe('unit-d:interfaces/TokenInfo', () => {
  it('should extend Position', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Position>()
  })

  it('should extend TokenFields', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<TokenFields>()
  })
})
