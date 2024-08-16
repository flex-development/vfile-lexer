/**
 * @file Type Tests - CreateInitialConstruct
 * @module vfile-lexer/types/tests/unit-d/CreateInitialConstruct
 */

import type { InitialConstruct } from '#src/interfaces'
import type { EmptyArray } from '@flex-development/tutils'
import type TestSubject from '../create-initial-construct'

describe('unit-d:types/CreateInitialConstruct', () => {
  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<EmptyArray>()
    })
  })

  describe('returns', () => {
    it('should return InitialConstruct', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<InitialConstruct>()
    })
  })
})
