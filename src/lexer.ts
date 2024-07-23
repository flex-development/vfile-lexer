/**
 * @file Lexer
 * @module vfile-lexer/lexer
 */

import { u } from '@flex-development/unist-util-builder'
import { Location } from '@flex-development/vfile-location'
import debug from 'debug'
import { ok as assert } from 'devlop'
import { push, splice } from 'micromark-util-chunked'
import { initialize } from './constructs'
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
import type {
  Attempt,
  Code,
  CodeCheck,
  Column,
  Constructs,
  DefineSkip,
  Event,
  Line,
  Offset,
  ReturnHandle,
  State,
  TokenFactory,
  TokenType
} from './types'
import { isLineEnding, resolveAll } from './utils'

/**
 * Source file tokenizer.
 *
 * @see {@linkcode Location}
 * @see {@linkcode TokenizeContext}
 *
 * @class
 * @extends {Location}
 * @implements {TokenizeContext}
 */
class Lexer extends Location implements TokenizeContext {
  /**
   * Character codes.
   *
   * @see {@linkcode Code}
   *
   * @protected
   * @instance
   * @member {Code[]} chunks
   */
  protected chunks: Code[]

  /**
   * Expected character code, used for tracking bugs.
   *
   * @see {@linkcode Code}
   *
   * @private
   * @instance
   * @member {Code} code
   */
  #code: Code

  /**
   * Character code consumption state, used for tracking bugs.
   *
   * @private
   * @instance
   * @member {boolean | null} consumed
   */
  #consumed: boolean | null

  /**
   * Tokenize context.
   *
   * @see {@linkcode TokenizeContext}
   *
   * @public
   * @instance
   * @member {TokenizeContext} context
   */
  public context: TokenizeContext

  /**
   * Debug logger.
   *
   * @see {@linkcode debug.Debugger}
   *
   * @protected
   * @instance
   * @member {debug.Debugger} debug
   */
  protected debug: debug.Debugger

  /**
   * Disabled construct names.
   *
   * @protected
   * @instance
   * @member {ReadonlyArray<string>} disabled
   */
  protected disabled: readonly string[]

  /**
   * Context object to transition the state machine.
   *
   * @see {@linkcode Effects}
   *
   * @protected
   * @instance
   * @member {Effects} effects
   */
  protected effects: Effects

  /**
   * Line ending code check.
   *
   * @see {@linkcode CodeCheck}
   *
   * @protected
   * @instance
   * @member {CodeCheck} eol
   */
  protected eol: CodeCheck

  /**
   * List of events.
   *
   * @see {@linkcode Event}
   *
   * @public
   * @instance
   * @member {Event[]} events
   */
  public events: Event[]

  /**
   * Head token.
   *
   * @see {@linkcode Token}
   *
   * @public
   * @instance
   * @member {Token | undefined} head
   */
  public head: Token | undefined

  /**
   * Initialization construct.
   *
   * @see {@linkcode InitialConstruct}
   *
   * @protected
   * @instance
   * @member {InitialConstruct} initialize
   */
  protected initialize: InitialConstruct

  /**
   * Last construct.
   *
   * @see {@linkcode Construct}
   *
   * @protected
   * @instance
   * @member {Construct | null | undefined} lastConstruct
   */
  protected lastConstruct: Construct | null | undefined

  /**
   * Last {@linkcode events} length.
   *
   * @protected
   * @instance
   * @member {number} lastEvent
   */
  protected lastEvent: number

  /**
   * Last place.
   *
   * @see {@linkcode Place}
   *
   * @protected
   * @instance
   * @member {Place} lastPlace
   */
  protected lastPlace: Place

  /**
   * Last token stack.
   *
   * @see {@linkcode Token}
   *
   * @protected
   * @instance
   * @member {Token[]} lastStack
   */
  protected lastStack: Token[]

  /**
   * Current point in file.
   *
   * @see {@linkcode Place}
   *
   * @public
   * @instance
   * @member {Place} place
   */
  declare public place: Place

  /**
   * Constructs with `resolveAll` handlers.
   *
   * @see {@linkcode Construct}
   *
   * @protected
   * @instance
   * @member {Construct[]} resolveAll
   */
  protected resolveAll: Construct[]

  /**
   * Map, where each key is a line number and each value a column to be skipped
   * to when the internal reader is on that line.
   *
   * @see {@linkcode Column}
   * @see {@linkcode Line}
   *
   * @protected
   * @instance
   * @member {Record<Line, Column>} skips
   */
  protected skips: Record<Line, Column>

  /**
   * Token stack.
   *
   * @see {@linkcode Token}
   *
   * @protected
   * @instance
   * @member {Token[]} stack
   */
  protected stack: Token[]

  /**
   * Current state.
   *
   * @see {@linkcode State}
   *
   * @protected
   * @instance
   * @member {State | undefined} state
   */
  protected state: State | undefined

  /**
   * Tail token.
   *
   * @see {@linkcode Token}
   *
   * @public
   * @instance
   * @member {Token | undefined} tail
   */
  public tail: Token | undefined

  /**
   * Token factory.
   *
   * @see {@linkcode TokenFactory}
   *
   * @protected
   * @instance
   * @member {TokenFactory} token
   */
  protected token: TokenFactory

  /**
   * Create a new file tokenizer.
   *
   * @see {@linkcode Options}
   *
   * @param {Options | null | undefined} [options] - Tokenize options
   */
  constructor(options?: Options | null | undefined) {
    super(null, options?.from)

    const {
      constructs,
      debug: debugName,
      disabled,
      eol,
      finalizeContext,
      initialize: initializer,
      token
    } = options ?? {}

    this.debug = debug(debugName ?? 'vfile-lexer')
    this.disabled = Object.freeze(disabled ?? [])
    this.initialize = initializer ?? initialize(constructs ?? {})
    this.token = token ?? function token(
      type: TokenType,
      info: TokenInfo
    ): Token {
      return Object.defineProperties(u(type, info), {
        next: { enumerable: false, writable: true },
        previous: { enumerable: false, writable: true }
      })
    }

    assert(typeof this.token, 'expected token factory')
    this.#code = codes.eof
    this.#consumed = true
    this.chunks = []
    this.eol = eol ?? isLineEnding
    this.events = []
    this.head = undefined
    this.lastConstruct = null
    this.lastEvent = 0
    this.lastPlace = this.now()
    this.lastStack = []
    this.place._index = 0
    this.resolveAll = []
    this.skips = {}
    this.stack = []
    this.tail = undefined

    /**
     * Base context object.
     *
     * @const {TokenizeContext} context
     */
    const context: TokenizeContext = Object.defineProperties({
      code: codes.eof,
      currentConstruct: this.lastConstruct,
      defineSkip: this.defineSkip.bind(this),
      events: this.events,
      next: codes.eof,
      now: this.now.bind(this),
      previous: codes.eof,
      sliceSerialize: this.sliceSerialize.bind(this),
      sliceStream: this.sliceStream.bind(this),
      write: this.write.bind(this)
    }, {
      /* c8 ignore next 6 */
      code: { configurable: false, get: (): Code => this.code },
      next: { configurable: false, get: (): Code => this.next },
      previous: { configurable: false, get: (): Code => this.previous }
    })

    this.effects = {
      attempt: this.constructFactory(this.resolve.bind(this)),
      check: this.constructFactory(this.restore.bind(this)),
      consume: this.consume.bind(this),
      enter: this.enter.bind(this),
      exit: this.exit.bind(this),
      interrupt: this.constructFactory(this.restore.bind(this), true)
    }

    this.context = context
    this.context = finalizeContext?.call(this, this.context) ?? this.context

    this.initialize.resolveAll && this.resolveAll.push(this.initialize)
    this.state = this.initialize.tokenize.call(this.context, this.effects)
  }

  /**
   * Get the current character code without changing the position of the reader.
   *
   * > 👉 Equivalent to `this.peek(0)`.
   *
   * @see {@linkcode Code}
   *
   * @public
   * @instance
   *
   * @return {Code} Current character code
   */
  public get code(): Code {
    return this.peek(0)
  }

  /**
   * Check if end of stream has been reached.
   *
   * @protected
   * @instance
   *
   * @return {boolean} `true` if at end of stream, `false` otherwise
   */
  protected get eos(): boolean {
    return this.chunks[this.chunks.length - 1] === codes.eof
  }

  /**
   * Get the next character code without changing the position of the reader.
   *
   * > 👉 Equivalent to `this.peek()`.
   *
   * @see {@linkcode Code}
   *
   * @public
   * @instance
   *
   * @return {Code} Next character code
   */
  public get next(): Code {
    return this.peek()
  }

  /**
   * Get the previous character code without changing the position of the
   * reader.
   *
   * > 👉 Equivalent to `this.peek(-1)`.
   *
   * @see {@linkcode Code}
   *
   * @public
   * @instance
   *
   * @return {Code} Previous character code
   */
  public get previous(): Code {
    return this.peek(-1)
  }

  /**
   * Factory to attempt/check/interrupt.
   *
   * @see {@linkcode Attempt}
   * @see {@linkcode ReturnHandle}
   *
   * @protected
   * @instance
   *
   * @param {ReturnHandle} onreturn - Successful construct callback
   * @param {boolean | null | undefined} [interrupt] - Interrupting?
   * @return {Attempt} attempt/check/interrupt state
   */
  protected constructFactory(
    onreturn: ReturnHandle,
    interrupt?: boolean | null | undefined
  ): Attempt {
    /**
     * `this` lexer.
     *
     * @const {this} self
     */
    const self: this = this

    return function hook(
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
       * Index of current construct.
       *
       * @var {number} j
       */
      let j: number

      /**
       * Construct list.
       *
       * @var {ReadonlyArray<Construct>} list
       */
      let list: readonly Construct[]

      // handle list of constructs, single construct, or map of constructs
      return Array.isArray(construct)
        ? handleConstructList(construct)
        : 'tokenize' in construct
        ? handleConstructList([construct])
        : handleConstructMap(construct)

      /**
       * Handle a list of constructs.
       *
       * @param {ReadonlyArray<Construct>} constructs - Constructs to try
       * @return {State} Next state
       */
      function handleConstructList(constructs: readonly Construct[]): State {
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
      function handleConstructMap(map: ConstructRecord): State {
        return run

        /**
         * Check if `value` looks like a construct, or list of constructs.
         *
         * @param {unknown} value - Value to check
         * @return {value is Construct | ReadonlyArray<Construct>} `true` if
         * value is an object
         */
        function is(value: unknown): value is Construct | readonly Construct[] {
          return typeof value === 'object'
        }

        /**
         * Start construct tokenization.
         *
         * @param {Code} code - Current character code
         * @return {State | undefined} Next state
         */
        function run(code: Code): State | undefined {
          return handleConstructList([
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
         * Start construct tokenization.
         *
         * @param {Code} code - Current character code
         * @return {State | undefined} Next state
         */
        function start(code: Code): State | undefined {
          const { context, disabled, effects } = self
          const { name, partial, previous, test, tokenize } = construct

          currentConstruct = construct

          if (!partial) context.currentConstruct = construct
          self.store()

          context.interrupt = interrupt

          switch (true) {
            case !!name && disabled.includes(name):
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
        assert(code === self.#code, 'expected `code` to equal expected code')
        self.debug('ok: `%o`', code)

        self.#consumed = true
        onreturn(currentConstruct)

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
        assert(code === self.#code, 'expected `code` to equal expected code')
        self.debug('nok: `%o`', code)

        self.#consumed = true
        self.restore()

        return ++j < list.length ? handleConstruct(list[j]!) : fail
      }
    }
  }

  /**
   * Consume a character code and move onto the next.
   *
   * @see {@linkcode Code}
   *
   * @protected
   * @instance
   *
   * @param {Code} code - Current character code
   * @return {undefined} Nothing
   */
  protected consume(code: Code): undefined {
    assert(code === this.#code, 'expected `code` to equal expected code')
    this.debug('consume: `%o`', code)
    assert(this.#consumed === null, 'expected unconsumed code')
    return void (this.read(), this.#consumed = true)
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
   * @public
   * @instance
   *
   * @param {Pick<Point, 'column' | 'line'>} point - Skip point
   * @return {undefined} Nothing
   */
  public defineSkip(point: Pick<Point, 'column' | 'line'>): undefined {
    this.skips[point.line] = point.column
    return this.skip(), void this.debug('position: define skip: `%j`', point)
  }

  /* c8 ignore stop */

  /**
   * Start a new token.
   *
   * @see {@linkcode TokenFields}
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
   *
   * @protected
   * @instance
   *
   * @param {TokenType} type - Token type
   * @param {TokenFields | null | undefined} [fields] - Token fields
   * @return {Token} Open token
   */
  protected enter(
    type: TokenType,
    fields?: TokenFields | null | undefined
  ): Token {
    /**
     * New token.
     *
     * @const {Token} token
     */
    const token: Token = this.token(type, {
      ...fields,
      start: this.now(), // eslint-disable-next-line sort-keys
      end: this.now()
    })

    // shift/replace/init tail
    if (this.head) {
      assert(this.tail, 'expected tail token')
      token.previous = this.tail
      this.tail.next = token
      this.tail = this.tail.next
    } else {
      this.head = this.tail = token
    }

    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')
    this.debug('enter: `%s`; %o', type, token.start)

    this.events.push([ev.enter, token, this.context])
    this.stack.push(token)

    return token
  }

  /**
   * Close an open token.
   *
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
   *
   * @protected
   * @instance
   *
   * @param {TokenType} type - Token type
   * @return {Token} Closed token
   */
  protected exit(type: TokenType): Token {
    assert(typeof type === 'string', 'expected `type` to be a string')
    assert(type.length > 0, 'expected `type` to be a non-empty string')

    /**
     * Token to close.
     *
     * @const {Token | undefined} token
     */
    const token: Token | undefined = this.stack.pop()

    assert(token, 'cannot exit without open token')
    assert(type === token.type, 'expected exit token to match current token')

    // end token
    token.end = this.now()

    this.debug('exit: `%s`; %o', token.type, token.end)
    this.events.push([ev.exit, token, this.context])

    return token
  }

  /**
   * Deal with one character code.
   *
   * @see {@linkcode Code}
   *
   * @protected
   * @instance
   *
   * @param {Code} code - Character code to handle
   * @return {undefined} Nothing
   */
  protected go(code: Code): undefined {
    assert(this.#consumed, `expected code \`${code}\` to be consumed`)
    this.#consumed = null
    this.debug('go: `%o`, %j', code, /* c8 ignore next */ this.state?.name)
    this.#code = code
    assert(typeof this.state === 'function', 'expected state function')
    this.state = this.state(code)
    return void code
  }

  /**
   * Get the current point in the file.
   *
   * @see {@linkcode Place}
   *
   * @public
   * @instance
   *
   * @return {Place} Current point in file, relative to {@linkcode start}
   */
  public now(): Place {
    const { _index, column, line, offset } = this.place
    // eslint-disable-next-line sort-keys
    return { line, column, offset, _index }
  }

  /**
   * Get the next `k`-th character code from the file without changing the
   * position of the reader.
   *
   * @see {@linkcode Code}
   *
   * @public
   * @instance
   *
   * @param {number?} [k=1] - Difference between index of next `k`-th character
   * code and index of current character code
   * @return {Code} Peeked character code
   */
  public peek(k: number = 1): Code {
    return this.chunks[this.place._index + k] ?? codes.eof
  }

  /**
   * Get the next character code.
   *
   * Unlike {@linkcode peek}, this method changes the position of the reader.
   *
   * @see {@linkcode Code}
   *
   * @protected
   * @instance
   *
   * @return {Code} Next character code
   */
  protected read(): Code {
    /**
     * Current character code.
     *
     * @const {Code} code
     */
    const code: Code = this.code

    if (this.eol(code)) {
      this.place.column = 1
      this.place.line++
      this.place.offset += code === codes.crlf ? 2 : 1
      this.skip()
      this.debug('position after eol: %o', this.place)
    } else if (code !== codes.vs && code !== codes.eof) {
      this.place.column++
      this.place.offset++
    } else if (code === codes.vs && this.previous === codes.vht) {
      this.place.column++
      this.place.offset++
    }

    return this.chunks[++this.place._index] ?? codes.eof
  }

  /**
   * Resolve events.
   *
   * @see {@linkcode Construct}
   * @see {@linkcode Offset}
   *
   * @protected
   * @instance
   *
   * @param {Construct} construct - Construct to handle
   * @param {Offset?} [lastEvent=this.lastEvent] - Last event index
   * @return {undefined} Nothing
   */
  protected resolve(
    construct: Construct,
    lastEvent: Offset = this.lastEvent
  ): undefined {
    if (construct.resolveAll && !this.resolveAll.includes(construct)) {
      this.resolveAll.push(construct)
    }

    if (construct.resolve) {
      splice(
        this.events,
        lastEvent,
        this.events.length - lastEvent,
        construct.resolve(this.events.slice(lastEvent), this.context)
      )

      this.resolveTokenList()
    }

    if (construct.resolveTo) {
      this.events = construct.resolveTo(this.events, this.context)
      this.resolveTokenList()
    }

    assert(
      /* c8 ignore next 3 */ !!construct.partial ||
        !this.events.length ||
        this.events[this.events.length - 1]![0] === ev.exit,
      'expected last token to end'
    )

    return void construct
  }

  /**
   * Resolve the token list.
   *
   * > 👉 Resets {@linkcode head} and {@linkcode tail}.
   *
   * @protected
   * @instance
   *
   * @return {undefined} Nothing
   */
  protected resolveTokenList(): undefined {
    this.head = undefined
    this.tail = undefined

    if (this.events.length) {
      /**
       * Head token.
       *
       * @const {Token} head
       */
      const head: Token = this.events[0]![1]

      /**
       * Tail token.
       *
       * @var {Token} tail
       */
      let tail: Token = head

      for (const [event, token] of this.events) {
        if (event === ev.enter) {
          token.previous = tail
          tail.next = token
          tail = tail.next
        }
      }

      assert(tail, 'expected tail token')
      this.head = head
      this.head.previous = undefined
      this.tail = tail
      this.tail.next = undefined
    }

    return void this.events
  }

  /**
   * Restore the last construct, event index, location, tail token, and token
   * stack.
   *
   * @protected
   * @instance
   *
   * @return {undefined} Nothing
   */
  protected restore(): undefined {
    this.context.currentConstruct = this.lastConstruct
    this.events.length = this.lastEvent
    this.place = this.lastPlace
    this.stack = this.lastStack
    this.debug('restore: %o', this.now())

    return void this.resolveTokenList()
  }

  /**
   * Move the current point a bit forward in the line when on a column skip.
   *
   * @todo test
   *
   * @protected
   * @instance
   *
   * @return {undefined} Nothing
   */
  protected skip(): undefined {
    /* c8 ignore next 4 */
    if (this.place.line in this.skips && this.place.column < 2) {
      this.place.column = this.skips[this.place.line]!
      this.place.offset += this.place.column - 1
    }

    return void this.place
  }

  /**
   * Get the text spanning `range` without changing the position of the reader.
   *
   * @see {@linkcode Position}
   *
   * @public
   * @instance
   *
   * @param {Position} range - Position in stream
   * @param {boolean | null | undefined} [expandTabs] - Expand tabs?
   * @return {string} Serialized slice
   */
  public sliceSerialize(
    range: Position,
    expandTabs?: boolean | null | undefined
  ): string {
    /**
     * Character code slice.
     *
     * @const {Code[]} slice
     */
    const slice: Code[] = this.sliceStream(range)

    /**
     * Serialized character code array.
     *
     * @const {string[]} result
     */
    const result: string[] = []

    /**
     * Current code represents horizontal tab?
     *
     * @var {boolean} tab
     */
    let tab: boolean = false

    for (const code of slice) {
      switch (code) {
        case codes.crlf:
          result.push(chars.crlf)
          break
        case codes.vcr:
          result.push(chars.cr)
          break
        case codes.vht:
          result.push(expandTabs ? chars.space : chars.ht)
          break
        case codes.vlf:
          result.push(chars.lf)
          break
        case codes.vs:
          if (!expandTabs && tab) continue
          result.push(chars.space)
          break
        default:
          result.push(String.fromCodePoint(code!))
      }

      tab = code === codes.vht
    }

    return result.join(chars.empty)
  }

  /**
   * Get the chunks spanning `range`.
   *
   * @see {@linkcode Code}
   * @see {@linkcode Position}
   *
   * @public
   * @instance
   *
   * @param {Position} range - Position in stream
   * @return {Code[]} List of chunks
   */
  public sliceStream(range: Position): Code[] {
    return this.chunks.slice(range.start._index, range.end._index)
  }

  /**
   * Store the current construct, event index, location, tail token, and token
   * stack.
   *
   * @protected
   * @instance
   *
   * @return {undefined} Nothing
   */
  protected store(): undefined {
    this.lastConstruct = this.context.currentConstruct
    this.lastEvent = this.events.length
    this.lastPlace = this.now()
    this.lastStack = [...this.stack]

    return void this
  }

  /**
   * Main loop to walk through {@linkcode chunks}.
   *
   * > 👉 The {@linkcode read} method modifies `_index` in {@linkcode place} to
   * > advance the loop until end of stream.
   *
   * @protected
   * @instance
   *
   * @return {this} `this` lexer
   */
  protected tokenize(): this {
    while (this.place._index <= this.chunks.length) this.go(this.code)
    return this
  }

  /**
   * Write a slice of chunks.
   *
   * The eof code (`null`) can be used to signal end of stream.
   *
   * @see {@linkcode Code}
   * @see {@linkcode Event}
   *
   * @public
   * @instance
   *
   * @param {Code[]} slice - Chunks
   * @return {Event[]} List of events
   */
  public write(slice: Code[]): Event[] {
    this.chunks = push(this.chunks, slice)
    this.tokenize()

    // exit if not done, resolve might change stuff
    /* c8 ignore next */ if (!this.eos) return []

    // resolve and exit
    this.resolve(this.initialize, 0)
    this.events = resolveAll(this.resolveAll, this.events, this.context)
    this.resolveTokenList()

    return this.events
  }
}

export default Lexer
