/**
 * @file Type Tests - Effects
 * @module vfile-lexer/types/tests/unit-d/Effects
 */

import type Attempt from '../attempt'
import type Consume from '../consume'
import type TestSubject from '../effects'
import type Enter from '../enter'
import type Exit from '../exit'

describe('unit-d:types/Effects', () => {
  it('should match [attempt: Attempt]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('attempt')
      .toEqualTypeOf<Attempt>()
  })

  it('should match [check: Attempt]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('check').toEqualTypeOf<Attempt>()
  })

  it('should match [consume: Consume]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('consume')
      .toEqualTypeOf<Consume>()
  })

  it('should match [enter: Enter]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('enter').toEqualTypeOf<Enter>()
  })

  it('should match [exit: Exit]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('exit').toEqualTypeOf<Exit>()
  })

  it('should match [interrupt: Attempt]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('interrupt')
      .toEqualTypeOf<Attempt>()
  })
})
