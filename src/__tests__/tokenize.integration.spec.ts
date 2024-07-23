/**
 * @file Integration Tests - tokenize
 * @module vfile-lexer/tests/integration/tokenize
 */

import tt from '#fixtures/tt'
import { initialize } from '#src/constructs'
import { chars } from '#src/enums'
import type {
  Encoding,
  FileLike,
  TokenizeOptions,
  Value
} from '#src/types'
import { resolveSlice } from '#src/utils'
import {
  codeFenced,
  codeText,
  eof,
  lineEnding,
  micromark,
  typeMetadata
} from '#tests/constructs'
import finalizeContext from '#tests/utils/finalize-context'
import list from '#tests/utils/list'
import { readSync as read } from 'to-vfile'
import testSubject from '../tokenize'

describe('integration:tokenize', () => {
  it.each<[
    value?: FileLike | Value | null | undefined,
    options?: TokenizeOptions | null | undefined
  ]>([
    [],
    [chars.nul, { nul: false }],
    [read('__fixtures__/markdown/empty.md')],
    [read('__fixtures__/markdown/code-fenced.md')]
  ])('should work without constructs (%#)', (value, options) => {
    // Act
    const result = testSubject(value, options)

    // Expect
    expect(result).to.be.an('array').that.is.empty
    expect(list(result)).to.have.ordered.members(list(result[0]?.[1]))
  })

  it.each<[
    value: FileLike | Value,
    encoding: Encoding | null | undefined,
    options?: TokenizeOptions | null | undefined
  ]>([
    [chars.lf + chars.cr + chars.crlf, null, { constructs: lineEnding }],
    [read('__fixtures__/type-metadata.txt'), 'utf8', {
      disabled: [tt.eof],
      initialize: Object.assign(initialize([typeMetadata, eof]), {
        resolveAll: resolveSlice
      })
    }],
    [read('__fixtures__/markdown/code-indented.md'), null, {
      constructs: micromark,
      finalizeContext
    }],
    [read('__fixtures__/markdown/code-text.md'), 'utf8', {
      constructs: [codeFenced, codeText, eof]
    }],
    [read('__fixtures__/markdown/html-flow.md'), null, {
      constructs: micromark,
      finalizeContext
    }]
  ])('should work with constructs (%#)', (value, encoding, options) => {
    // Act
    const result = testSubject(value, encoding, options)

    // Expect
    expect(result).to.be.an('array').that.is.not.empty
    expect(list(result)).to.have.ordered.members(list(result[0]?.[1]))
    expect(result[0]![1]).toMatchSnapshot()
  })
})
