/**
 * @file Type Tests - TokenFields
 * @module vfile-lexer/types/tests/unit-d/TokenFields
 */

import type { Token } from '#src/interfaces'
import type TestSubject from '../token-fields'

describe('unit-d:types/TokenFields', () => {
  it('should equal Omit<Token, "type">', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Omit<Token, 'type'>>()
  })
})
