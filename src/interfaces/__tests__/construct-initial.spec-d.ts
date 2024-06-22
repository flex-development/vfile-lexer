/**
 * @file Type Tests - InitialConstruct
 * @module vfile-lexer/interfaces/tests/unit-d/InitialConstruct
 */

import type { Initializer } from '#src/types'
import type Construct from '../construct'
import type TestSubject from '../construct-initial'

describe('unit-d:interfaces/InitialConstruct', () => {
  it('should extend Construct', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Construct>()
  })

  it('should match [tokenize: Initializer]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tokenize')
      .toEqualTypeOf<Initializer>()
  })
})
