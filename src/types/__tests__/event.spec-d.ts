/**
 * @file Type Tests - Event
 * @module vfile-lexer/types/tests/unit-d/Event
 */

import type tk from '#fixtures/tk'
import type { Token, TokenizeContext } from '#src/interfaces'
import type TestSubject from '../event'
import type EventType from '../event-type'

describe('unit-d:types/Event', () => {
  type T = tk.whitespace
  type Subject = TestSubject<T>

  it('should match [0: EventType]', () => {
    expectTypeOf<Subject>().toHaveProperty('0').toEqualTypeOf<EventType>()
  })

  it('should match [1: Token<T>]', () => {
    expectTypeOf<Subject>().toHaveProperty('1').toEqualTypeOf<Token<T>>()
  })

  it('should match [2: TokenizeContext]', () => {
    expectTypeOf<Subject>().toHaveProperty('2').toEqualTypeOf<TokenizeContext>()
  })
})
