/**
 * @file Type Tests - Token
 * @module vfile-lexer/interfaces/tests/unit-d/Token
 */

import type { TokenType } from '#src/types'
import type { Position } from '@flex-development/vfile-reader'
import type TestSubject from '../token'

describe('unit-d:interfaces/Token', () => {
  it('should extend Position', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Position>()
  })

  it('should match [next?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('next')
      .toEqualTypeOf<TestSubject | undefined>()
  })

  it('should match [previous?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('previous')
      .toEqualTypeOf<TestSubject | undefined>()
  })

  it('should match [type: T]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('type')
      .toEqualTypeOf<TokenType>()
  })
})
