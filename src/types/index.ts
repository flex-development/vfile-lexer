/**
 * @file Entry Point - Type Aliases
 * @module vfile-lexer/types
 */

export type {
  Code,
  CodeCheck,
  Offset,
  Range,
  RangeTuple,
  ReaderSlice
} from '@flex-development/vfile-reader'
export type {
  default as Attempt,
  default as Check,
  default as Interrupt
} from './attempt'
export type { default as Constructs } from './constructs'
export type { default as Consume } from './consume'
export type { default as Effects } from './effects'
export type { default as Enter } from './enter'
export type { default as Event } from './event'
export type { default as EventType } from './event-type'
export type { default as Exit } from './exit'
export type { default as FinalizeContext } from './finalize-context'
export type { default as Guard } from './guard'
export type { default as Initializer } from './initializer'
export type { default as Resolver } from './resolver'
export type { default as ReturnHandle } from './return-handle'
export type { default as State } from './state'
export type { default as TokenFactory } from './token-factory'
export type { default as TokenFields } from './token-fields'
export type { default as TokenType } from './token-type'
export type { default as Tokenizer } from './tokenizer'
