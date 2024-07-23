/**
 * @file Type Tests - Preprocessor
 * @module vfile-lexer/types/tests/unit-d/Preprocessor
 */

import type Code from '../code'
import type Encoding from '../encoding'
import type FileLike from '../file-like'
import type TestSubject from '../preprocessor'
import type Value from '../value'

describe('unit-d:types/Preprocessor', () => {
  describe('parameters', () => {
    it('should be callable with [FileLike | Value | null | undefined, (Encoding | null | undefined)?]', () => {
      // Arrange
      type P = [
        value: FileLike | Value | null | undefined,
        encoding?: Encoding | null | undefined
      ]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return Code[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Code[]>()
    })
  })
})
