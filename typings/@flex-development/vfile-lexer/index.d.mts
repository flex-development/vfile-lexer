import type tk from '#fixtures/tk'
import type {} from '#src/interfaces'

declare module '#src/interfaces' {
  interface TokenTypeMap {
    bigint: tk.bigint
    inlineTag: tk.inlineTag
    number: tk.number
    punctuator: tk.punctuator
    string: tk.string
    tag: tk.tag
    whitespace: tk.whitespace
  }
}
