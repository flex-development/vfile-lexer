/**
 * @file Type Tests - PreprocessOptions
 * @module vfile-lexer/interfaces/tests/unit-d/PreprocessOptions
 */

import type { Nilable, Optional } from '@flex-development/tutils'
import type TestSubject from '../options-preprocess'

describe('unit-d:interfaces/PreprocessOptions', () => {
  it('should match [nul?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('nul')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [tabSize?: number | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tabSize')
      .toEqualTypeOf<Optional<number>>()
  })
})
