/**
 * @file Type Tests - Code
 * @module vfile-lexer/types/tests/unit-d/Code
 */

import type TestSubject from '../code'

describe('unit-d:types/Code', () => {
  it('should extract null', () => {
    expectTypeOf<TestSubject>().extract<null>().not.toBeNever()
  })

  it('should extract number', () => {
    expectTypeOf<TestSubject>().extract<number>().not.toBeNever()
  })
})
