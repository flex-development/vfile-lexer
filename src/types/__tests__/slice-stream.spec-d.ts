/**
 * @file Type Tests - SliceStream
 * @module vfile-lexer/types/tests/unit-d/SliceStream
 */

import type { Position } from '#src/interfaces'
import type Code from '../code'
import type TestSubject from '../slice-stream'

describe('unit-d:types/SliceStream', () => {
  describe('parameters', () => {
    it('should be callable with [Position]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Position]>()
    })
  })

  describe('returns', () => {
    it('should return Code[]', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Code[]>()
    })
  })
})
