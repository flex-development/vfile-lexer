/**
 * @file Interfaces - PreprocessOptions
 * @module vfile-lexer/interfaces/PreprocessOptions
 */

/**
 * Preprocessor configuration options.
 */
interface PreprocessOptions {
  /**
   * Number of spaces a tab is equivalent to.
   *
   * @default 2
   */
  tabSize?: number | undefined
}

export type { PreprocessOptions as default }
