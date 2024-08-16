/**
 * @file Type Tests - Place
 * @module vfile-lexer/interfaces/tests/unit-d/Place
 */

import type { Point } from '@flex-development/vfile-location'
import type TestSubject from '../place'

describe('unit-d:interfaces/Place', () => {
  it('should extend Point', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Point>()
  })

  it('should match [_index: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('_index').toEqualTypeOf<number>()
  })
})
