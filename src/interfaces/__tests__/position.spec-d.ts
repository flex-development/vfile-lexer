/**
 * @file Type Tests - Position
 * @module vfile-lexer/interfaces/tests/unit-d/Position
 */

import type Place from '../place'
import type TestSubject from '../position'

describe('unit-d:interfaces/Position', () => {
  it('should match [end: Place]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('end').toEqualTypeOf<Place>()
  })

  it('should match [start: Place]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('start').toEqualTypeOf<Place>()
  })
})
