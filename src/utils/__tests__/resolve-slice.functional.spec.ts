/**
 * @file Functional Tests - resolveSlice
 * @module vfile-lexer/utils/tests/functional/resolveSlice
 */

import tk from '#fixtures/tk'
import { ev } from '#src/enums'
import type { Token, TokenizeContext } from '#src/interfaces'
import type { Event } from '#src/types'
import type { MockInstance } from '#tests/interfaces'
import type { Range } from '@flex-development/vfile-reader'
import testSubject from '../resolve-slice'

describe('functional:utils/resolveSlice', () => {
  let context: TokenizeContext
  let events: Event[]
  let sliceSerialize: MockInstance<TokenizeContext['sliceSerialize']>
  let token: Token
  let value: string

  beforeEach(() => {
    token = {
      end: { column: 1, line: 2, offset: 17 },
      start: { column: 17, line: 1, offset: 16 },
      type: tk.whitespace
    }

    value = '\n'
    sliceSerialize = vi.fn<[range: Range], string>(() => value)
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
