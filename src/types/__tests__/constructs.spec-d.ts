/**
 * @file Type Tests - Constructs
 * @module vfile-lexer/types/tests/unit-d/Constructs
 */

import type { ConstructRecord } from '#src/interfaces'
import type TestSubject from '../constructs'
import type RecordConstructs from '../constructs-record'

describe('unit-d:types/Constructs', () => {
  it('should extract ConstructRecord', () => {
    expectTypeOf<TestSubject>().extract<ConstructRecord>().not.toBeNever()
  })

  it('should extract RecordConstructs', () => {
    expectTypeOf<TestSubject>().extract<RecordConstructs>().not.toBeNever()
  })
})
