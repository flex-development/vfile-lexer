/**
 * @file Type Tests - TokenizeContext
 * @module vfile-lexer/interfaces/tests/unit-d/TokenizeContext
 */

import type {
  Code,
  DefineSkip,
  Event,
  Now,
  SliceSerialize,
  SliceStream,
  Write
} from '#src/types'
import type { Nilable } from '@flex-development/tutils'
import type Construct from '../construct'
import type TestSubject from '../tokenize-context'

describe('unit-d:interfaces/TokenizeContext', () => {
  it('should match [code: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('code').toEqualTypeOf<Code>()
  })

  it('should match [currentConstruct?: Construct | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('currentConstruct')
      .toEqualTypeOf<Nilable<Construct>>()
  })

  it('should match [defineSkip: DefineSkip]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('defineSkip')
      .toEqualTypeOf<DefineSkip>()
  })

  it('should match [events: Event[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('events')
      .toEqualTypeOf<Event[]>()
  })

  it('should match [interrupt?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('interrupt')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [next: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('next').toEqualTypeOf<Code>()
  })

  it('should match [now: Now]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('now').toEqualTypeOf<Now>()
  })

  it('should match [previous: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('previous').toEqualTypeOf<Code>()
  })

  it('should match [sliceSerialize: SliceSerialize]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sliceSerialize')
      .toEqualTypeOf<SliceSerialize>()
  })

  it('should match [sliceStream: SliceStream]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sliceStream')
      .toEqualTypeOf<SliceStream>()
  })

  it('should match [write: Write]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('write').toEqualTypeOf<Write>()
  })
})
