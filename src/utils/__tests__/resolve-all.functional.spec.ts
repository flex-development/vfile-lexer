/**
 * @file Functional Tests - resolveAll
 * @module vfile-lexer/utils/tests/functional/resolveAll
 */

import { ev, tt } from '#src/enums'
import type { Construct, Token, TokenizeContext } from '#src/interfaces'
import type { Event, Resolver } from '#src/types'
import type { MockInstance } from '#tests/interfaces'
import type { Point } from '@flex-development/vfile-reader'
import testSubject from '../resolve-all'

describe('functional:utils/resolveAll', () => {
  let constructs: { resolveAll: MockInstance<Resolver> }[]
  let context: TokenizeContext
  let events: Event[]
  let point: Point
  let resolveAll: MockInstance<Resolver>
  let token: Token

  beforeEach(() => {
    point = { column: 1, line: 1, offset: 0 }
    token = { end: point, start: point, type: tt.sof }

    context = {} as unknown as TokenizeContext
    events = [[ev.enter, token, context], [ev.exit, token, context]]

    resolveAll = vi.fn<[Event[], TokenizeContext], Event[]>(() => events)
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
