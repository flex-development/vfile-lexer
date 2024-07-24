/**
 * @file Type Tests - ConstructRecord
 * @module vfile-lexer/interfaces/tests/unit-d/ConstructRecord
 */

import { codes } from '#src/enums'
import type { RecordConstructs } from '#src/types'
import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../construct-record'

describe('unit-d:interfaces/ConstructRecord', () => {
  type Value = Nilable<RecordConstructs>

  it('should match [[x: `${number}`]: RecordConstructs | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(`${codes.graveAccent}`)
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
