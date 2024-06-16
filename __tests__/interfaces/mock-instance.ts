/**
 * @file Test Interfaces - MockInstance
 * @module tests/interfaces/MockInstance
 */

import type { Fn } from '@flex-development/tutils'
import type * as vitest from 'vitest'

/**
 * {@linkcode vitest.MockInstance} utility.
 *
 * @template F - Function being mocked
 *
 * @extends {vitest.Mock<Parameters<F>,ReturnType<F>>}
 */
interface MockInstance<F extends Fn = Fn>
  extends vitest.MockInstance<Parameters<F>, ReturnType<F>> {}

export type { MockInstance as default }
