/**
 * @file Unit Tests - isLineEnding
 * @module vfile-lexer/utils/tests/unit/isLineEnding
 */

import { codes } from '#src/enums'
import testSubject from '../is-line-ending'

describe('unit:utils/isLineEnding', () => {
  it('should return false if `code` is not line ending', () => {
    expect(testSubject(codes.eof)).to.be.false
  })

  it.each<keyof typeof codes>([
    'cr',
    'crlf',
    'lf',
    'ls',
    'ps',
    'vcr',
    'vlf'
  ])('should return true if `code` is line ending (codes.%s)', key => {
    expect(testSubject(codes[key])).to.be.true
  })
})
