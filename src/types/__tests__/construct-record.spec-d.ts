/**
 * @file Type Tests - ConstructRecord
 * @module vfile-lexer/types/tests/unit-d/ConstructRecord
 */

import type { Nilable } from '@flex-development/tutils'
import { codes } from '@flex-development/vfile-reader'
import type TestSubject from '../construct-record'
import type RecordConstructs from '../constructs-record'

describe('unit-d:types/ConstructRecord', () => {
  type Value = Nilable<RecordConstructs>

  it('should match [[x: `${number}`]: RecordConstructs | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(`${codes.backtick}`)
      .toEqualTypeOf<Value>()
  })

  it('should match [[x: "null"]: RecordConstructs | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(`${codes.eof}`)
      .toEqualTypeOf<Value>()
  })

  it('should match [[x: number]: RecordConstructs | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(codes.at)
      .toEqualTypeOf<Value>()
  })
})
