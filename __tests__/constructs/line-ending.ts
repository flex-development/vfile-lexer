/**
 * @file Test Constructs - lineEnding
 * @module tests/constructs/lineEnding
 */

import type { Construct } from '#src/interfaces'
import type { Tokenizer } from '#src/types'
import { resolveSlice } from '#src/utils'
import * as micromark from 'micromark-core-commonmark'
import { markdownLineEnding } from 'micromark-util-character'

/**
 * Line ending construct.
 *
 * @const {Construct} lineEnding
 */
const lineEnding: Construct = {
  name: micromark.lineEnding.name,
  resolve: resolveSlice,
  test: markdownLineEnding,
  tokenize: micromark.lineEnding.tokenize as unknown as Tokenizer
}

export default lineEnding
