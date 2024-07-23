/**
 * @file Test Constructs - micromark
 * @module tests/constructs/micromark
 */

import { codes } from '#src/enums'
import type { ConstructRecord } from '#src/interfaces'
import { codeIndented, hardBreakEscape } from 'micromark-core-commonmark'
import codeFenced from './code-fenced'
import codeText from './code-text'
import eof from './eof'
import htmlFlow from './html-flow'

/**
 * Markdown construct record.
 *
 * @const {ConstructRecord} micromark
 */
const micromark: ConstructRecord = {
  [codes.lt]: htmlFlow,
  [codes.vht]: codeIndented,
  [codes.vs]: codeIndented,
  [codes.space]: codeIndented,
  [codes.graveAccent]: [codeFenced, codeText],
  [codes.tilde]: codeFenced,
  [codes.backslash]: hardBreakEscape,
  null: [eof]
} as unknown as ConstructRecord

export default micromark
