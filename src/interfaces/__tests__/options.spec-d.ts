/**
 * @file Type Tests - Options
 * @module vfile-lexer/interfaces/tests/unit-d/Options
 */

import type {
  CodeCheck,
  CreateInitialConstruct,
  FinalizeContext,
  Preprocessor,
  TokenFactory
} from '#src/types'
import type { Nilable } from '@flex-development/tutils'
import type { Point } from '@flex-development/vfile-location'
import type InitialConstruct from '../construct-initial'
import type TestSubject from '../options'

describe('unit-d:interfaces/Options', () => {
  it('should match [debug?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('debug')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [disabled?: readonly string[] | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('disabled')
      .toEqualTypeOf<Nilable<readonly string[]>>()
  })

  it('should match [eol?: CodeCheck | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('eol')
      .toEqualTypeOf<Nilable<CodeCheck>>()
  })

  it('should match [finalizeContext?: FinalizeContext | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('finalizeContext')
      .toEqualTypeOf<Nilable<FinalizeContext>>()
  })

  it('should match [from?: Point | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('from')
      .toEqualTypeOf<Nilable<Point>>()
  })

  it('should match [initialize: CreateInitialConstruct | InitialConstruct]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('initialize')
      .toEqualTypeOf<CreateInitialConstruct | InitialConstruct>()
  })

  it('should match [preprocess?: Preprocessor | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preprocess')
      .toEqualTypeOf<Nilable<Preprocessor>>()
  })

  it('should match [token?: TokenFactory | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('token')
      .toEqualTypeOf<Nilable<TokenFactory>>()
  })
})
