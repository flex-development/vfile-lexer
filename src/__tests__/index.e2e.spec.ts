/**
 * @file E2E Tests - api
 * @module vfile-lexer/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:vfile-lexer', () => {
  it('should expose public api', () => {
    expect(testSubject).to.have.keys([
      'Lexer',
      'chars',
      'codes',
      'eof',
      'ev',
      'initialize',
      'resolveAll',
      'resolveSlice',
      'tokenize'
    ])
  })
})
