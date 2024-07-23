/**
 * @file Type Tests - FileLike
 * @module vfile-lexer/types/tests/unit-d/FileLike
 */

import type TestSubject from '../file-like'
import type Value from '../value'

describe('unit-d:types/FileLike', () => {
  it('should match [value: Value]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('value').toMatchTypeOf<Value>()
  })
})
