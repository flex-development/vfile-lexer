/**
 * @file Type Tests - Value
 * @module vfile-lexer/types/tests/unit-d/Value
 */

import type TestSubject from '../value'

describe('unit-d:types/Value', () => {
  it('should extract Uint8Array', () => {
    expectTypeOf<TestSubject>().extract<Uint8Array>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
