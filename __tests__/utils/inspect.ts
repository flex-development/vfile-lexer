/**
 * @file Test Utilities - inspect
 * @module tests/utils/inspect
 */

import type { Token } from '#src/interfaces'
import { omit } from '@flex-development/tutils'
import { u } from '@flex-development/unist-util-builder'
import { inspectNoColor } from '@flex-development/unist-util-inspect'
import list from './list'

export default inspect

/**
 * Inspect a token list.
 *
 * @see {@linkcode Token}
 *
 * @param {Token} token - Head token
 * @return {string} Pretty printed token list
 */
function inspect(token: Token): string {
  return inspectNoColor(u('tokens', list(token).map(token => {
    return u(token.type, {
      ...omit(Object.assign({}, token), ['end', 'next', 'previous', 'start']),
      position: {
        end: Object.assign({}, token.end),
        start: Object.assign({}, token.start)
      }
    })
  })))
}
