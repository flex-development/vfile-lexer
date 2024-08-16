/**
 * @file createTokenizer
 * @module vfile-lexer/createTokenizer
 */

import { u } from '@flex-development/unist-util-builder'
import { Location } from '@flex-development/vfile-location'
import createDebug, { type Debugger } from 'debug'
import { ok as assert } from 'devlop'
import { push, splice } from 'micromark-util-chunked'
import { chars, codes, ev } from './enums'
import type {
  Construct,
  ConstructRecord,
  Effects,
  InitialConstruct,
  Options,
  Place,
  Point,
  Position,
  Token,
  TokenFields,
  TokenInfo,
  TokenizeContext
} from './interfaces'
import createPreprocessor from './preprocess'
import type {
  Attempt,
  Chunk,
  Code,
  Column,
  ConstructPack,
  Constructs,
  DefineSkip,
  Event,
  Info,
  Line,
  Preprocessor,
  ReturnHandle,
  State,
  TokenFactory,
  TokenType
} from './types'
import { isLineEnding, resolveAll } from './utils'

/**
 * Create a tokenizer.
 *
 * @see {@linkcode Options}
 * @see {@linkcode TokenizeContext}
 *
 * @param {Options} options - Tokenize options
 * @return {TokenizeContext} Tokenize context
 */
function createTokenizer(options: Options): TokenizeContext {
  /**
   * Debug logger.
   *
   * @const {Debugger} debug
   */
  const debug: Debugger = createDebug(options.debug ?? 'unist-util-tokenize')

  /**
   * Initial construct.
   *
   * @const {InitialConstruct} initialize
   */
  const initialize: InitialConstruct = typeof options.initialize === 'function'
    ? options.initialize()
    : options.initialize

  /**
   * Location utility.
   *
   * @const {Location} location
   */
  const location: Location = new Location(null, options.from)

  /**
   * Turn a value into character code chunks.
   *
   * @const {Preprocessor} preprocess
   */
  const preprocess: Preprocessor = options.preprocess ?? createPreprocessor()

  /**
   * Constructs with `resolveAll` handlers.
   *
   * @const {Construct[]} resolveAllConstructs
   */
  const resolveAllConstructs: Construct[] = []

  /**
   * Map, where each key is a line number and each value a column to be skipped
   * to when the tokenizer has reached that line.
   *
   * @const {Record<Line, Column>} skips
   */
  const skips: Record<Line, Column> = {}

  /**
   * Create a new token.
   *
   * @param {TokenType} type - Token type
   * @param {TokenInfo} info - Token info
   * @return {Token} New token
   */
  const token: TokenFactory = options.token ?? function token(
    type: TokenType,
    info: TokenInfo
  ): Token {
    return Object.defineProperties(u(type, info), {
      next: { enumerable: false, writable: true },
      previous: { enumerable: false, writable: true }
    })
  }

  /**
   * Character code chunks.
   *
   * @var {Code[]} chunks
   */
  let chunks: Code[] = []

  /**
   * Character code consumption state, used for tracking bugs.
   *
   * @var {boolean | null} consumed
   */
  let consumed: boolean | null = true

  /**
   * Current point in file.
   *
   * @var {Place} place
   */
  let place: Place = location.place as Place

  /**
   * Token stack.
   *
   * @var {Token[]} stack
   */
  let stack: Token[] = []

  /**
   * Tools used for tokenizing.
   *
   * @const {Effects} effects
   */
  const effects: Effects = {
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    consume,
    enter,
    exit,
    interrupt: constructFactory(onsuccessfulcheck, true)
  }

  /**
   * State and tools for resolving and serializing.
   *
   * @var {TokenizeContext} context
   */
  let context: TokenizeContext = {
    code: codes.eof,
    currentConstruct: undefined,
    defineSkip,
    events: [],
    next: codes.eof,
    now,
    previous: codes.eof,
    serializeChunks,
    sliceSerialize,
    sliceStream,
    token,
    write
  }

  context = options.finalizeContext?.call({}, context) ?? context
  initialize.resolveAll && resolveAllConstructs.push(initialize)
  place._index = 0

  /**
   * Expected character code, used for tracking bugs.
   *
   * @var {Code} expected
   */
  let expected: Code

  /**
   * Current state.
   *
   * @var {State | undefined} state
   */
  let state: State | undefined = initialize.tokenize.call(context, effects)

  return context

  /**
   * Factory to attempt/check/interrupt.
   *
   * @see {@linkcode Attempt}
   * @see {@linkcode ReturnHandle}
   *
   * @param {ReturnHandle} onreturn - Successful construct callback
   * @param {boolean | null | undefined} [interrupt] - Interrupting?
   * @return {Attempt} attempt/check/interrupt
   */
  function constructFactory(
    onreturn: ReturnHandle,
    interrupt?: boolean | null | undefined
  ): Attempt {
    return hook

    /**
     * Handle either an object mapping codes to constructs, a list of
     * constructs, or a single construct.
     *
     * @param {Constructs} construct - Constructs to try
     * @param {State | undefined} [succ] - Successful tokenization state
     * @param {State | undefined} [fail] - Failed tokenization state
     * @return {State} Next state
     */
    function hook(
      construct: Constructs,
      succ: State = /* c8 ignore next */ () => undefined,
      fail?: State
    ): State {
      /**
       * Current construct.
       *
       * @var {Construct} currentConstruct
       */
      let currentConstruct: Construct

      /**
       * Info passed around.
       *
       * @var {Info} info
       */
      let info: Info

      /**
       * Index of current construct.
       *
       * @var {number} j
       */
      let j: number

      /**
       * Construct list.
       *
       * @var {Construct[]} list
       */
      let list: Construct[]

      // handle list of constructs, single construct, or map of constructs
      return Array.isArray(construct)
        ? handleConstructList(construct)
        : 'tokenize' in construct
        ? handleConstructList([construct])
        : handleConstructRecord(construct)

      /**
       * Handle a list of constructs.
       *
       * @param {Construct[]} constructs - Constructs to try
       * @return {State} Next state
       */
      function handleConstructList(constructs: Construct[]): State {
        list = constructs
        j = 0

        /* c8 ignore next 3 */ if (constructs.length === 0) {
          assert(fail, 'expected `fail` to be given')
          return fail
        }

        return handleConstruct(constructs[j]!)
      }

      /**
       * Handle a construct record.
       *
       * @param {ConstructRecord} map - Constructs to try
       * @return {State} Next state
       */
      function handleConstructRecord(map: ConstructRecord): State {
        return run

        /**
         * Check if `value` looks like a construct, or list of constructs.
         *
         * @param {unknown} value - Value to check
         * @return {value is ConstructPack} `true` if value is an object
         */
        function is(value: unknown): value is ConstructPack {
          return typeof value === 'object'
        }

        /**
         * @param {Code} code - Current character code
         * @return {State | undefined} Next state
         */
        function run(code: Code): State | undefined {
          return handleConstructList([
            ...[map.nullFirst].flat().filter(value => is(value)),
            ...[code !== null && map[code]].flat().filter(value => is(value)),
            ...[map.null].flat().filter(value => is(value))
          ])(code)
        }
      }

      /**
       * Handle a single construct.
       *
       * @param {Construct} construct - Construct to try
       * @return {State} Next state
       */
      function handleConstruct(construct: Construct): State {
        return start

        /**
         * @param {Code} code - Current character code
         * @return {State | undefined} Next state
         */
        function start(code: Code): State | undefined {
          const { name, partial, previous, test, tokenize } = construct

          info = store()
          currentConstruct = construct

          if (!partial) context.currentConstruct = construct

          context.interrupt = <boolean | undefined>interrupt

          switch (true) {
            case !!name && !!options.disabled?.includes(name):
            case !!previous && !previous.call(context, context.previous):
            case !!test && !test.call(context, code):
              return nok(code)
            default:
              return tokenize.call(context, effects, ok, nok)(code)
          }
        }
      }

      /**
       * State to go on successful tokenization.
       *
       * @param {Code} code - Current character code
       * @return {State} Next state
       */
      function ok(code: Code): State {
        assert(code === expected, 'expected `code` to equal expected code')
        debug('ok: `%o`', code)
        consumed = true
        onreturn(currentConstruct, info)
        return succ
      }

      /**
       * State to go on failed tokenization.
       *
       * @param {Code} code - Current character code
       * @return {State | undefined} Next state
       */
      function nok(code: Code): State | undefined {
        assert(list, 'expected construct list')
        assert(code === expected, 'expected `code` to equal expected code')
        debug('nok: `%o`', code)
        consumed = true
        info.restore()
        return ++j < list.length ? handleConstruct(list[j]!) : fail
      }
    }
  }

  /**
   * Consume a character code and move onto the next.
   *
   * @see {@linkcode Code}
   *
   * @param {Code} code - Current character code
   * @return {undefined} Nothing
   */
  function consume(code: Code): undefined {
    assert(code === expected, 'expected `code` to equal expected code')
    debug('consume: `%o`', code)
    assert(consumed === null, 'expected unconsumed code')

    context.code = read()
    context.next = peek()
    context.previous = code

    return void (consumed = true, code)
  }

  /* c8 ignore start */

  /**
   * Define a skip.
   *
   * @see {@linkcode DefineSkip}
   * @see {@linkcode Point}
   *
   * @todo test
   *
   * @param {Pick<Point, 'column' | 'line'>} point - Skip point
   * @return {undefined} Nothing
   */
  function defineSkip(point: Pick<Point, 'column' | 'line'>): undefined {
    skips[point.line] = point.column
    return skip(), void debug('position: define skip: `%j`', point)
  }

  /* c8 ignore stop */

  /**
   * Start a new token.
   *
   * @see {@linkcode TokenFields}
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
   *
   * @param {TokenType} type - Token type
   * @param {TokenFields | null | undefined} [fields] - Token fields
   * @return {Token} Open token
   */
  function enter(
    type: TokenType,
    fields?: TokenFields | null | undefined
  ): Token {
    skip()

    /**
     * New token.
     *
     * @const {Token} token
     */
    const token: Token = context.token(type, {
      ...fields,
      start: now(), // eslint-disable-next-line sort-keys
      end: location.point(-1) as Place
    })

    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')
    debug('enter: `%s`; %o', type, token.start)

    context.events.push([ev.enter, token, context])
    stack.push(token)

    return token
  }

  /**
   * Check if end of stream has been reached.
   *
   * @return {boolean} `true` if at end of stream, `false` otherwise
   */
  function eos(): boolean {
    return chunks[chunks.length - 1] === codes.eof
  }

  /**
   * Close an open token.
   *
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
   *
   * @param {TokenType} type - Token type
   * @return {Token} Closed token
   */
  function exit(type: TokenType): Token {
    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')

    /**
     * Token to close.
     *
     * @const {Token | undefined} token
     */
    const token: Token | undefined = stack.pop()

    assert(token, 'cannot exit without open token')

    token.end = now()
    debug('exit: `%s`; %o', token.type, token.end)

    assert(type === token.type, 'expected exit token to match current token')
    context.events.push([ev.exit, token, context])

    return token
  }

  /**
   * Deal with one character code.
   *
   * @see {@linkcode Code}
   *
   * @param {Code} code - Character code to handle
   * @return {undefined} Nothing
   */
  function go(code: Code): undefined {
    assert(consumed, `expected code \`${code}\` to be consumed`)
    consumed = null
    debug('go: `%o`, %j', code, /* c8 ignore next */ state?.name)
    expected = code
    assert(typeof state === 'function', 'expected state function')
    state = state(code)
    return void code
  }

  /**
   * Get the current point in the file.
   *
   * @see {@linkcode Place}
   *
   * @return {Place} Current point in file, relative to {@linkcode start}
   */
  function now(): Place {
    const { _index, column, line, offset } = place
    // eslint-disable-next-line sort-keys
    return { line, column, offset, _index }
  }

  /* c8 ignore start */

  /**
   * Discard results.
   *
   * @todo test
   *
   * @see {@linkcode Construct}
   * @see {@linkcode Info}
   *
   * @param {Construct} construct - Successful construct
   * @param {Info} info - Info passed around
   * @return {undefined} Nothing
   */
  function onsuccessfulcheck(construct: Construct, info: Info): undefined {
    return void info.restore()
  }

  /* c8 ignore stop */

  /**
   * Use results.
   *
   * @see {@linkcode Construct}
   * @see {@linkcode Info}
   *
   * @param {Construct} construct - Successful construct
   * @param {Info} info - Info passed around
   * @return {undefined} Nothing
   */
  function onsuccessfulconstruct(
    construct: Construct,
    info: Info
  ): undefined {
    return void result(construct, info.from)
  }

  /**
   * Get the next `k`-th character code from the file without changing the
   * position of the tokenizer.
   *
   * @see {@linkcode Code}
   *
   * @param {number?} [k=1] - Difference between index of next `k`-th character
   * code and index of current character code
   * @return {Code} Peeked character code
   */
  function peek(k: number = 1): Code {
    return chunks[place._index + k] ?? codes.eof
  }

  /**
   * Get the next character code.
   *
   * Unlike {@linkcode peek}, this method changes the position of the reader.
   *
   * @see {@linkcode Code}
   *
   * @return {Code} Next character code
   */
  function read(): Code {
    /**
     * Current character code.
     *
     * @const {Code} code
     */
    const code: Code = peek(0)

    if ((options.eol ?? isLineEnding)(code)) {
      place.column = 1
      place.line++
      place.offset += code === codes.crlf ? 2 : 1
      debug('position after eol: %o', place)
    } else if (code !== codes.vs && code !== codes.eof) {
      place.column++
      place.offset++
    } else if (code === codes.vs && context.previous === codes.vht) {
      place.column++
    }

    return chunks[++place._index] ?? codes.eof
  }

  /**
   * Resolve events.
   *
   * @todo test resolve
   * @todo test resolveTo
   *
   * @see {@linkcode Construct}
   *
   * @param {Construct} construct - Construct to handle
   * @param {number} from - Last event index
   * @return {undefined} Nothing
   */
  function result(construct: Construct, from: number): undefined {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct)
    }

    /* c8 ignore start */

    if (construct.resolve) {
      splice(
        context.events,
        from,
        context.events.length - from,
        construct.resolve(context.events.slice(from), context)
      )
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context)
    }

    /* c8 ignore stop */

    assert(
      /* c8 ignore next 3 */ !!construct.partial ||
        !context.events.length ||
        context.events[context.events.length - 1]![0] === ev.exit,
      'expected last token to end'
    )

    return void construct
  }

  /**
   * Move the current point a bit forward in the line when on a column skip.
   *
   * @todo test
   *
   * @return {undefined} Nothing
   */
  function skip(): undefined {
    /* c8 ignore next 4 */
    if (place.line in skips && place.column < 2) {
      place.column = skips[place.line]!
      place.offset += place.column - 1
    }

    return void place
  }

  /**
   * Get the string value of a slice of `chunks`.
   *
   * @see {@linkcode Chunk}
   *
   * @todo test string chunk
   *
   * @param {Chunk[]} chunks - Chunks to serialize
   * @param {boolean | null | undefined} [expandTabs] - Expand tabs?
   * @return {string} String value of `chunks`
   */
  function serializeChunks(
    chunks: Chunk[],
    expandTabs?: boolean | null | undefined
  ): string {
    /**
     * Serialized character code array.
     *
     * @const {string[]} result
     */
    const result: string[] = []

    /**
     * Index of current chunk.
     *
     * @var {number} index
     */
    let index: number = -1

    /**
     * Current code represents horizontal tab?
     *
     * @var {boolean} tab
     */
    let tab: boolean = false

    while (++index < chunks.length) {
      /**
       * Current chunk.
       *
       * @const {Chunk} chunk
       */
      const chunk: Chunk = <Chunk>chunks[index]

      /**
       * Current serialized chunk.
       *
       * @var {string} value
       */
      let value: string

      /* c8 ignore next 2 */ if (typeof chunk === 'string') {
        value = chunk
      } else {
        switch (chunk) {
          case codes.crlf:
            value = chars.crlf
            break
          case codes.vcr:
            value = chars.cr
            break
          case codes.vht:
            value = expandTabs ? chars.space : chars.ht
            break
          case codes.vlf:
            value = chars.lf
            break
          case codes.vs:
            if (!expandTabs && tab) continue
            value = chars.space
            break
          default:
            assert(typeof chunk === 'number', 'expected code point')
            value = String.fromCodePoint(chunk)
        }
      }

      tab = chunk === codes.vht
      result.push(value)
    }

    return result.join(chars.empty)
  }

  /**
   * Get the text spanning `range`.
   *
   * @see {@linkcode Position}
   *
   * @param {Position} range - Position in stream
   * @param {boolean | null | undefined} [expandTabs] - Expand tabs?
   * @return {string} Serialized slice
   */
  function sliceSerialize(
    range: Position,
    expandTabs?: boolean | null | undefined
  ): string {
    return context.serializeChunks(context.sliceStream(range), expandTabs)
  }

  /**
   * Get the chunks spanning `range`.
   *
   * @see {@linkcode Code}
   * @see {@linkcode Position}
   *
   * @param {Position} range - Position in stream
   * @return {Code[]} List of chunks
   */
  function sliceStream(range: Position): Code[] {
    return chunks.slice(range.start._index, range.end._index)
  }

  /**
   * Store state.
   *
   * @return {Info} Info passed around
   */
  function store(): Info {
    /**
     * Current character code.
     *
     * @const {Code} code
     */
    const code: Code = context.code

    /**
     * Current construct.
     *
     * @const {Construct} currentConstruct
     */
    const currentConstruct: Construct | undefined = context.currentConstruct

    /**
     * Current events length.
     *
     * @const {number} from
     */
    const from: number = context.events.length

    /**
     * Current place.
     *
     * @const {Place} lastPlace
     */
    const lastPlace: Place = now()

    /**
     * Current token stack.
     *
     * @const {Token[]} lastStack
     */
    const lastStack: Token[] = [...stack]

    /**
     * Next character code.
     *
     * @const {Code} next
     */
    const next: Code = context.next

    /**
     * Previous character code.
     *
     * @const {Code} previous
     */
    const previous: Code = context.previous

    return { from, restore }

    /**
     * Restore state.
     *
     * @return {undefined} Nothing
     */
    function restore(): undefined {
      place = lastPlace
      stack = lastStack

      context.code = code
      context.currentConstruct = currentConstruct
      context.events.length = from
      context.next = next
      context.previous = previous

      skip()
      return void debug('restore: %o', place)
    }
  }

  /**
   * Main loop to walk through {@linkcode chunks}.
   *
   * > 👉 The {@linkcode read} method modifies `_index` in {@linkcode place} to
   * > advance the loop until end of stream.
   *
   * @return {undefined} Nothing
   */
  function tokenize(): undefined {
    while (place._index < chunks.length) go(peek(0))
    eos() && state && go(context.code)
    return void state
  }

  /**
   * Write a slice of chunks.
   *
   * The eof code (`null`) can be used to signal end of stream.
   *
   * @see {@linkcode Chunk}
   * @see {@linkcode Event}
   *
   * @param {Chunk[]} slice - Chunks
   * @return {Event[]} List of events
   */
  function write(slice: Chunk[]): Event[] {
    chunks = push(chunks, slice.flatMap(chunk => {
      /* c8 ignore next 2 */ return typeof chunk === 'string'
        ? preprocess(chunk)
        : chunk
    }))

    tokenize()

    // exit if not done, resolvers might change stuff
    /* c8 ignore next */ if (!eos()) return []

    result(initialize, 0)
    context.events = resolveAll(resolveAllConstructs, context.events, context)
    return context.events
  }
}

export default createTokenizer
