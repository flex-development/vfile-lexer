/**
 * @file Type Tests - SerializeChunks
 * @module vfile-lexer/types/tests/unit-d/SerializeChunks
 */

import type Chunk from '../chunk'
import type TestSubject from '../serialize-chunks'

describe('unit-d:types/SerializeChunks', () => {
  describe('parameters', () => {
    it('should be callable with [Chunk[], (boolean | null | undefined)?]', () => {
      // Arrange
      type P = [chunks: Chunk[], expandTabs?: boolean | null | undefined]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<P>()
    })
  })

  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})
