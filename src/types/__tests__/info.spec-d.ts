/**
 * @file Type Tests - Info
 * @module vfile-lexer/types/tests/unit-d/Info
 */

import type TestSubject from '../info'
import type Restore from '../restore'

describe('unit-d:types/Info', () => {
  it('should match [from: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('from').toMatchTypeOf<number>()
  })

  it('should match [restore: Restore]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('restore')
      .toMatchTypeOf<Restore>()
  })
})
