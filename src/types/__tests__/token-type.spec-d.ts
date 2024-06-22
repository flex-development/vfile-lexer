/**
 * @file Type Tests - TokenType
 * @module vfile-lexer/interfaces/tests/unit-d/TokenType
 */

import type { TokenTypeMap } from '#src/interfaces'
import type TestSubject from '../token-type'

describe('unit-d:interfaces/TokenType', () => {
  it('should equal keyof TokenTypeMap', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<keyof TokenTypeMap>()
  })
})
