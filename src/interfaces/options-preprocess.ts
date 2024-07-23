/**
 * @file Interfaces - PreprocessOptions
 * @module vfile-lexer/interfaces/PreprocessOptions
 */

/**
 * Preprocessor configuration options.
 */
interface PreprocessOptions {
  /**
   * Expand tabs?
   */
  expandTabs?: boolean | null | undefined

  /**
   * If `false`, substitute the NUL character for the replacement character.
   *
   * @default false
   */
  nul?: boolean | null | undefined

  /**
   * Number of spaces a tab is equivalent to.
   *
   * @default 2
   */
  tabSize?: number | undefined
}

export type { PreprocessOptions as default }
