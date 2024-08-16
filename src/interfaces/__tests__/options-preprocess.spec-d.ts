/**
 * @file Type Tests - PreprocessOptions
 * @module vfile-lexer/interfaces/tests/unit-d/PreprocessOptions
 */

import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../options-preprocess'

describe('unit-d:interfaces/PreprocessOptions', () => {
  it('should match [tabSize?: number | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tabSize')
      .toEqualTypeOf<Optional<number>>()
  })
})
