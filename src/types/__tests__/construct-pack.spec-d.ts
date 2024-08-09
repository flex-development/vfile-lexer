/**
 * @file Type Tests - ConstructPack
 * @module vfile-lexer/types/tests/unit-d/ConstructPack
 */

import type { Construct } from '#src/interfaces'
import type TestSubject from '../construct-pack'

describe('unit-d:types/ConstructPack', () => {
  it('should extract Construct', () => {
    expectTypeOf<TestSubject>().extract<Construct>().not.toBeNever()
  })

  it('should extract Construct[]', () => {
    expectTypeOf<TestSubject>().extract<Construct[]>().not.toBeNever()
  })
})
