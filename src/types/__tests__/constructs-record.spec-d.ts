/**
 * @file Type Tests - RecordConstructs
 * @module vfile-lexer/types/tests/unit-d/RecordConstructs
 */

import type { Construct } from '#src/interfaces'
import type TestSubject from '../constructs-record'

describe('unit-d:types/RecordConstructs', () => {
  it('should extract Construct', () => {
    expectTypeOf<TestSubject>().extract<Construct>().not.toBeNever()
  })

  it('should extract Construct[]', () => {
    expectTypeOf<TestSubject>().extract<Construct[]>().not.toBeNever()
  })
})
