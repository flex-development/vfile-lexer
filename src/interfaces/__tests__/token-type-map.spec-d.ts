/**
 * @file Type Tests - TokenTypeMap
 * @module vfile-lexer/interfaces/tests/unit-d/TokenTypeMap
 */

import type { tt } from '#src/enums'
import type TestSubject from '../token-type-map'

describe('unit-d:interfaces/TokenTypeMap', () => {
  it('should register token types', () => {
    expectTypeOf<keyof TestSubject>().exclude<keyof typeof tt>().not.toBeNever()
    expectTypeOf<keyof TestSubject>().extract<keyof typeof tt>().not.toBeNever()
  })
})
