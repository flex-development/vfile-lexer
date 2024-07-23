/**
 * @file Functional Tests - resolveAll
 * @module vfile-lexer/utils/tests/functional/resolveAll
 */

import tt from '#fixtures/tt'
import { ev } from '#src/enums'
import type { Construct, Place, Token, TokenizeContext } from '#src/interfaces'
import type { Event, Resolver } from '#src/types'
import type { MockInstance } from 'vitest'
import testSubject from '../resolve-all'

describe('functional:utils/resolveAll', () => {
  let constructs: { resolveAll: MockInstance<Resolver> }[]
  let context: TokenizeContext
  let events: Event[]
  let point: Place
  let resolveAll: MockInstance<Resolver>
  let token: Token

  beforeEach(() => {
    point = { _index: 0, column: 1, line: 1, offset: 0 }
    token = { end: point, start: point, type: tt.eof }

    context = {} as unknown as TokenizeContext
    events = [[ev.enter, token, context], [ev.exit, token, context]]

    resolveAll = vi.fn<Resolver>(() => events)
    constructs = [{ resolveAll }, { resolveAll }]
  })

  it('should call `resolveAll` resolvers', () => {
    // Act
    testSubject(constructs as unknown as Construct[], events, context)

    // Expect
    expect(resolveAll).toHaveBeenCalledOnce()
    expect(resolveAll).toHaveBeenCalledWith(events, context)
  })
})
