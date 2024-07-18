/**
 * @file Integration Tests - tokenize
 * @module vfile-lexer/tests/integration/tokenize
 */

import tk from '#fixtures/tk'
import { initialize } from '#src/constructs'
import type { Options } from '#src/interfaces'
import { inlineTag, numeric, punctuator, string, ws } from '#tests/constructs'
import token from '#tests/utils/token'
import { identity } from '@flex-development/tutils'
import { codes } from '@flex-development/vfile-reader'
import { readSync as read } from 'to-vfile'
import type { VFile, Value } from 'vfile'
import type Lexer from '../lexer'
import testSubject from '../tokenize'

describe('integration:tokenize', () => {
  let run: (file: Value | VFile, options?: Partial<Options> | null) => Lexer

  beforeAll(() => {
    run = (file, options) => testSubject(file, { ...options, token })
  })

  describe('default constructs', () => {
    it('should tokenize empty file', () => {
      expect(run('', { constructs: [ws] }).head).toMatchSnapshot()
    })

    it('should tokenize non-empty file', () => {
      expect(run(read('__fixtures__/tk.ts')).head).toMatchSnapshot()
    })
  })

  describe('user constructs', () => {
    it('should tokenize empty file', () => {
      expect(run('', {
        constructs: [
          inlineTag,
          numeric,
          punctuator,
          string,
          ws
        ]
      }).head).toMatchSnapshot()
    })

    describe('non-empty file', () => {
      it.each<[VFile, (Partial<Options> | null | undefined)?]>([
        [read('__fixtures__/inline-tag.txt'), {
          constructs: {
            [codes.cr]: ws,
            [codes.leftBrace]: inlineTag,
            [codes.lf]: ws,
            [codes.space]: ws
          },
          context: vi.fn(),
          disabled: [tk.whitespace]
        }],
        [read('__fixtures__/hello.txt'), {
          constructs: [string, punctuator],
          context: vi.fn(identity),
          initialize: Object.assign(initialize([string, punctuator]), {
            resolveAll: vi.fn(identity)
          })
        }],
        [read('__fixtures__/strings.txt'), {
          constructs: [string, punctuator]
        }],
        [read('__fixtures__/numerics.txt'), { constructs: [numeric, ws] }]
      ])('sample %#', (file, options) => {
        expect(run(file, options).head).toMatchSnapshot()
      })
    })
  })
})
