/**
 * @file Type Tests - TokenizeContext
 * @module vfile-lexer/interfaces/tests/unit-d/TokenizeContext
 */

import type { Event } from '#src/types'
import type { Nilable } from '@flex-development/tutils'
import type {
  Code,
  CodeCheckFactory,
  CodeReader
} from '@flex-development/vfile-reader'
import type Construct from '../construct'
import type Token from '../token'
import type TestSubject from '../tokenize-context'

describe('unit-d:interfaces/TokenizeContext', () => {
  it('should match [check: CodeCheckFactory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('check')
      .toEqualTypeOf<CodeCheckFactory>()
  })

  it('should match [code: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('code').toEqualTypeOf<Code>()
  })

  it('should match [construct?: Construct | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('construct')
      .toEqualTypeOf<Nilable<Construct>>()
  })

  it('should match [constructs: readonly Construct[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('constructs')
      .toEqualTypeOf<readonly Construct[]>()
  })

  it('should match [disabled: readonly string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('disabled')
      .toEqualTypeOf<readonly string[]>()
  })

  it('should match [events: Event[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('events')
      .toEqualTypeOf<Event[]>()
  })

  it('should match [includes: CodeReader["includes"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('includes')
      .toEqualTypeOf<CodeReader['includes']>()
  })

  it('should match [interrupt?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('interrupt')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [next: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('next').toEqualTypeOf<Code>()
  })

  it('should match [now: CodeReader["now"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('now')
      .toEqualTypeOf<CodeReader['now']>()
  })

  it('should match [peek: CodeReader["peek"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('peek')
      .toEqualTypeOf<CodeReader['peek']>()
  })

  it('should match [previous: Code]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('previous').toEqualTypeOf<Code>()
  })

  it('should match [serialize: CodeReader["serialize"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('serialize')
      .toEqualTypeOf<CodeReader['serialize']>()
  })

  it('should match [slice: CodeReader["slice"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('slice')
      .toEqualTypeOf<CodeReader['slice']>()
  })

  it('should match [sliceSerialize: CodeReader["sliceSerialize"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sliceSerialize')
      .toEqualTypeOf<CodeReader['sliceSerialize']>()
  })

  it('should match [token: Readonly<Token>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('token')
      .toEqualTypeOf<Readonly<Token>>()
  })
})
