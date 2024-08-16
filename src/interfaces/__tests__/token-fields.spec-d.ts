/**
 * @file Type Tests - TokenFields
 * @module vfile-lexer/interfaces/tests/unit-d/TokenFields
 */

import type TestSubject from '../token-fields'

describe('unit-d:interfaces/TokenFields', () => {
  it('should register token fields', () => {
    expectTypeOf<keyof TestSubject>().not.toBeNever()
  })
})
