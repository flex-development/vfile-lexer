/**
 * @file Type Tests - Chunk
 * @module vfile-lexer/types/tests/unit-d/Chunk
 */

import type TestSubject from '../chunk'
import type Code from '../code'

describe('unit-d:types/Chunk', () => {
  it('should extract Code', () => {
    expectTypeOf<TestSubject>().extract<Code>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
