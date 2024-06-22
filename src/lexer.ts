/**
 * @file Lexer
 * @module vfile-lexer/lexer
 */

import {
  CodeReader as Reader,
  codes,
  type Code,
  type Offset,
  type Point
} from '@flex-development/vfile-reader'
import debug from 'debug'
import { ok as assert } from 'devlop'
import { splice } from 'micromark-util-chunked'
import type { VFile, Value } from 'vfile'
import { initialize } from './constructs'
import { ev } from './enums'
import type {
  Construct,
  InitialConstruct,
  Options,
  Token,
  TokenizeContext
} from './interfaces'
import type {
  Attempt,
  Constructs,
  Effects,
  Event,
  ReturnHandle,
  State,
  TokenFactory,
  TokenFields,
  TokenType
} from './types'
import { resolveAll } from './utils'

/**
 * Source file tokenizer.
 *
 * @class
 */
class Lexer {
  /**
   * Expected character code, used for tracking bugs.
   *
   * @see {@linkcode Code}
   *
   * @protected
   * @instance
   * @member {Code} code
   */
  protected code: Code

  /**
   * List of constructs.
   *
   * @see {@linkcode Construct}
   *
   * @protected
   * @instance
   * @member {Readonly<Construct>} constructs
   */
  protected constructs: readonly Construct[]

  /**
   * Character code consumption state, used for tracking bugs.
   *
   * @protected
   * @instance
   * @member {boolean | null} consumed
   */
  protected consumed: boolean | null

  /**
   * Tokenize context.
   *
   * @see {@linkcode TokenizeContext}
   *
   * @protected
   * @instance
   * @member {TokenizeContext} context
   */
  protected context: TokenizeContext

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
   * @public
   * @instance
   * @member {ReadonlyArray<string>} disabled
   */
  public disabled: readonly string[]

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
   * Boolean indicating end of file has been reached.
   *
   * @protected
   * @instance
   * @member {boolean} eof
   */
  protected eof: boolean

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
   * @member {Token} head
   */
  public head!: Token

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
   * Last event index.
   *
   * @see {@linkcode Offset}
   *
   * @protected
   * @instance
   * @member {Offset} lastEvent
   */
  protected lastEvent: Offset

  /**
   * Last reader index.
   *
   * @see {@linkcode Offset}
   *
   * @protected
   * @instance
   * @member {Offset} lastIndex
   */
  protected lastIndex: Offset

  /**
   * Source file reader.
   *
   * @see {@linkcode Reader}
   *
   * @protected
   * @instance
   * @member {Reader} reader
   */
  protected reader: Reader

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
   * @member {Token} tail
   */
  public tail!: Token

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
   * @see {@linkcode VFile}
   * @see {@linkcode Value}
   *
   * @param {Value | VFile | null | undefined} file - File to tokenize
   * @param {Options} options - Tokenization options
   */
  constructor(file: Value | VFile | null | undefined, options: Options) {
    assert(options.token, 'expected token factory')

    this.constructs = Object.freeze([...(options.constructs ?? [])])
    this.debug = debug(options.debug ?? 'vfile-lexer')
    this.disabled = Object.freeze(options.disabled ?? [])
    this.reader = new Reader(file, options.from)
    this.token = options.token

    this.code = this.reader.read()
    this.consumed = true
    this.eof = false
    this.events = []
    this.initialize = options.initialize ?? initialize
    this.lastConstruct = null
    this.lastEvent = 0
    this.lastIndex = 0
    this.resolveAll = []

    /**
     * Base context object.
     *
     * @const {TokenizeContext} context
     */
    const context: TokenizeContext = Object.defineProperties({
      check: this.reader.check.bind(this.reader),
      code: this.code,
      construct: this.lastConstruct,
      constructs: this.constructs,
      disabled: this.disabled,
      events: this.events,
      includes: this.reader.includes.bind(this.reader),
      next: this.reader.peek(),
      now: this.now.bind(this),
      peek: this.reader.peek.bind(this.reader),
      previous: this.reader.previous,
      serialize: this.reader.serialize.bind(this.reader),
      slice: this.reader.slice.bind(this.reader),
      sliceSerialize: this.reader.sliceSerialize.bind(this.reader),
      token: this.tail
    }, {
      /* c8 ignore next 6 */
      code: { configurable: false, get: (): Code => this.reader.output },
      next: { configurable: false, get: (): Code => this.reader.peek() },
      previous: { configurable: false, get: (): Code => this.reader.previous },
      token: {
        configurable: false,
        get: (): Readonly<Token> => Object.freeze(this.tail)
      }
    })

    this.context = options.context?.(context) ?? context

    this.effects = {
      attempt: this.constructFactory(this.resolve.bind(this)),
      check: this.constructFactory(this.restore.bind(this)),
      consume: this.consume.bind(this),
      enter: this.enter.bind(this),
      exit: this.exit.bind(this),
      interrupt: this.constructFactory(this.restore.bind(this), true)
    }

    if (this.initialize.resolveAll) this.resolveAll.push(this.initialize)
    this.state = this.initialize.tokenize.call(this.context, this.effects)
  }

  /**
   * Create a new file tokenizer for `file`.
   *
   * @see {@linkcode Options}
   * @see {@linkcode VFile}
   * @see {@linkcode Value}
   *
   * @public
   * @static
   *
   * @param {Value | VFile} file - File to tokenize
   * @param {Options} options - Tokenization options
   * @return {Lexer} New lexer instance
   */
  public static create(file: Value | VFile, options: Options): Lexer {
    return new Lexer(file, options)
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
       * @var {Construct} current
       */
      let current: Construct

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

      // handle a single construct, or a list of constructs
      return handleConstructList([construct].flat())

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

          current = construct

          if (!partial) context.construct = construct
          if (fail) self.store()

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
        assert(code === self.code, 'expected `code` to equal expected code')
        self.debug('ok: `%o`', code)

        self.consumed = true
        onreturn(current)

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
        assert(code === self.code, 'expected `code` to equal expected code')
        self.debug('nok: `%o`', code)

        self.consumed = true
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
    assert(code === this.code, 'expected `code` to equal expected code')
    this.debug('consume: `%o`', code)
    assert(this.consumed === null, 'expected unconsumed code')
    code !== codes.eof ? this.reader.read() : (this.eof = true)
    return void (this.consumed = true)
  }

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
   * @param {(Partial<TokenFields> | null)?} fields - Token fields
   * @return {Token} Open token
   */
  protected enter(
    type: TokenType,
    fields?: Partial<TokenFields> | null
  ): Token {
    /**
     * New token.
     *
     * @const {Token} token
     */
    const token: Token = this.token(type, {
      ...fields,
      end: this.reader.point(-1),
      start: this.now()
    })

    // shift/replace/init tail
    if ((<Token | undefined>this.head)) {
      token.previous = this.tail
      this.tail.next = token
      this.tail = this.tail.next
    } else {
      this.head = this.tail = token
    }

    this.debug('enter: `%s`; %o', type, token.start)
    this.events.push([ev.enter, token, this.context])

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
    assert(this.events.length, 'expected events')

    /**
     * Token to close.
     *
     * @var {Token | undefined} token
     */
    let token: Token | undefined = this.tail

    // find open token
    while (token) {
      if (
        !!token.start.column &&
        !!token.start.line &&
        token.start.offset >= 0 &&
        token.end.column + token.end.line + token.end.offset === -3
      ) {
        break
      }

      token = token.previous
    }

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
    assert(this.consumed, `expected code \`${code}\` to be consumed`)
    this.consumed = null
    this.debug('go: `%o`, %j', code, /* c8 ignore next */ this.state?.name)
    this.code = code
    assert(typeof this.state === 'function', 'expected state function')
    this.state = this.state(code)
    return void code
  }

  /**
   * Get the current point in the file.
   *
   * @see {@linkcode Point}
   *
   * @protected
   * @instance
   *
   * @return {Point} Current point in file
   */
  protected now(): Point {
    return this.reader.now()
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
      assert(lastEvent >= 0, 'expected last event index')

      splice(
        this.events,
        lastEvent,
        this.events.length - lastEvent,
        construct.resolve(this.events.slice(lastEvent), this.context)
      )
    }

    if (construct.resolveTo) {
      this.events = construct.resolveTo(this.events, this.context)
    }

    assert(
      /* c8 ignore next 3 */ !!construct.partial ||
        !this.context.events.length ||
        this.context.events[this.context.events.length - 1]![0] === ev.exit,
      'expected last token to end'
    )

    return void construct
  }

  /**
   * Restore the last construct, event index, reader position, and tail token.
   *
   * @protected
   * @instance
   *
   * @return {undefined} Nothing
   */
  protected restore(): undefined {
    assert(this.lastEvent >= 0, 'expected last event index')
    assert(this.lastIndex >= 0, 'expected last reader position')

    this.reader.read(this.lastIndex - this.reader.index)
    this.context.construct = this.lastConstruct
    this.events.length = this.lastEvent

    this.tail = undefined as unknown as Token

    if (this.events.length) {
      this.tail = this.events[this.events.length - 1]![1]
      this.tail.next = undefined
    }

    this.debug('restore: %o', this.now())
    return void this
  }

  /**
   * Store the current construct, event index, and reader position.
   *
   * @protected
   * @instance
   *
   * @return {undefined} Nothing
   */
  protected store(): undefined {
    this.lastConstruct = this.context.construct
    this.lastEvent = this.events.length
    this.lastIndex = this.reader.index

    return void this
  }

  /**
   * Tokenize the file.
   *
   * @public
   * @instance
   *
   * @return {this} `this` lexer
   */
  public tokenize(): this {
    while (!this.eof) this.go(this.reader.output)

    this.resolve(this.initialize, 0)
    this.events = resolveAll(this.resolveAll, this.events, this.context)

    return this
  }
}

export default Lexer
