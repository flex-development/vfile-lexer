/**
 * @file Functional Tests - resolveSlice
 * @module vfile-lexer/utils/tests/functional/resolveSlice
 */

import tt from '#fixtures/tt'
import { ev } from '#src/enums'
import type { Token, TokenizeContext } from '#src/interfaces'
import type { Event, SliceSerialize } from '#src/types'
import type { MockInstance } from 'vitest'
import testSubject from '../resolve-slice'

describe('functional:utils/resolveSlice', () => {
  let context: TokenizeContext
  let events: Event[]
  let sliceSerialize: MockInstance<SliceSerialize>
  let token: Token
  let value: string

  beforeEach(() => {
    token = {
      end: { _index: 16, column: 17, line: 1, offset: 16 },
      start: { _index: 0, column: 1, line: 1, offset: 0 },
      type: tt.typeMetadata
    }

    value = '{{ id: string }}'
    sliceSerialize = vi.fn<SliceSerialize>(() => value)
    context = { sliceSerialize } as unknown as TokenizeContext

    events = [[ev.enter, token, context], [ev.exit, token, context]]
  })

  it('should serialize tokens', () => {
    // Act
    testSubject(events, context)

    // Expect
    expect(sliceSerialize).toHaveBeenCalledOnce()
    expect(sliceSerialize).toHaveBeenCalledWith(token)
    expect(token).to.have.property('value', value)
  })
})
