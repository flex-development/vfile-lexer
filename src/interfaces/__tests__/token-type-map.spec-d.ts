/**
 * @file Type Tests - TokenTypeMap
 * @module vfile-lexer/interfaces/tests/unit-d/TokenTypeMap
 */

import type TestSubject from '../token-type-map'

describe('unit-d:interfaces/TokenTypeMap', () => {
  it('should register token types', () => {
    expectTypeOf<keyof TestSubject>().not.toBeNever()
  })
})
