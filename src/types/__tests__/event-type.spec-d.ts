/**
 * @file Type Tests - EventType
 * @module vfile-lexer/types/tests/unit-d/EventType
 */

import type { ev } from '#src/enums'
import type TestSubject from '../event-type'

describe('unit-d:types/EventType', () => {
  it('should extract keyof typeof ev', () => {
    expectTypeOf<TestSubject>().extract<keyof typeof ev>().not.toBeNever()
  })
})
