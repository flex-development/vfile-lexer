/**
 * @file Test Utilities - inspect
 * @module tests/utils/inspect
 */

import type { Token } from '#src/interfaces'
import { omit } from '@flex-development/tutils'
import { u } from '@flex-development/unist-util-builder'
import * as i from '@flex-development/unist-util-inspect'
import type { Literal, Node } from 'unist'

export default inspect

/**
 * Inspect a token list.
 *
 * @see {@linkcode i.Options}
 * @see {@linkcode Token}
 *
 * @param {Token} token - Head token
 * @param {(i.Options | null)?} [options] - Configuration options
 * @return {string} Pretty printed token list
 */
function inspect(token: Token, options?: i.Options | null): string {
  return i.inspectNoColor(u('tokens', nodes(token)), options)
}

/**
 * Convert a token to a list of nodes.
 *
 * @internal
 *
 * @param {Token} token - Head token
 * @return {(Literal | Node)[]} Node list
 */
function nodes(token: Token): (Literal | Node)[] {
  /**
   * Node list.
   *
   * @const {(Literal | Node)[]} list
   */
  const list: (Literal | Node)[] = []

  /**
   * Current token.
   *
   * @var {Token | undefined} tok
   */
  let tok: Token | undefined = token

  // build list
  while (tok) {
    /**
     * New node.
     *
     * @const {Literal | Node} node
     */
    const node: Literal | Node = u(tok.type, {
      ...omit({ ...tok }, ['end', 'next', 'previous', 'start']),
      position: { end: tok.end, start: tok.start }
    })

    list.push(node)
    tok = tok.next
  }

  return list
}
