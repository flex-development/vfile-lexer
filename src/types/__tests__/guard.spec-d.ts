/**
 * @file Type Tests - Guard
 * @module vfile-lexer/types/tests/unit-d/Guard
 */

import type { TokenizeContext } from '#src/interfaces'
import type { Code } from '@flex-development/vfile-reader'
import type TestSubject from '../guard'

describe('unit-d:types/Guard', () => {
  it('should match [this: TokenizeContext]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<TokenizeContext>()
  })

  describe('parameters', () => {
    it('should be callable with [Code]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Code]>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})
