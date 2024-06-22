/**
 * @file Type Tests - Constructs
 * @module vfile-lexer/types/tests/unit-d/Constructs
 */

import type { Construct } from '#src/interfaces'
import type TestSubject from '../constructs'

describe('unit-d:types/Constructs', () => {
  it('should extract Construct', () => {
    expectTypeOf<TestSubject>().extract<Construct>().not.toBeNever()
  })

  it('should extract Construct[]', () => {
    expectTypeOf<TestSubject>().extract<Construct[]>().not.toBeNever()
  })

  it('should extract readonly Construct[]', () => {
    expectTypeOf<TestSubject>().extract<readonly Construct[]>().not.toBeNever()
  })
})
