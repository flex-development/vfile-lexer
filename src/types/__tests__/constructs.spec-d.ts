/**
 * @file Type Tests - Constructs
 * @module vfile-lexer/types/tests/unit-d/Constructs
 */

import type { ConstructRecord } from '#src/interfaces'
import type ConstructPack from '../construct-pack'
import type TestSubject from '../constructs'

describe('unit-d:types/Constructs', () => {
  it('should extract ConstructRecord', () => {
    expectTypeOf<TestSubject>().extract<ConstructRecord>().not.toBeNever()
  })

  it('should extract ConstructPack', () => {
    expectTypeOf<TestSubject>().extract<ConstructPack>().not.toBeNever()
  })
})
