import type tt from '#fixtures/tt'
import type {} from '#src/interfaces'

declare module '#src/interfaces' {
  interface TokenFields {
    value?: string | null | undefined
  }

  interface TokenTypeMap {
    eof: tt.eof
    typeMetadata: tt.typeMetadata
  }
}
