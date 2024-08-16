/**
 * @file Type Tests - TokenizeOptions
 * @module vfile-lexer/types/tests/unit-d/TokenizeOptions
 */

import type { Options, PreprocessOptions } from '#src/interfaces'
import type TestSubject from '../tokenize-options'

describe('unit-d:types/TokenizeOptions', () => {
  it('should match Options', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Options>()
  })

  it('should match PreprocessOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PreprocessOptions>()
  })
})
