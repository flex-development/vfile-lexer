/**
 * @file Vitest Configuration
 * @module config/vitest
 * @see https://vitest.dev/config/
 */

import pathe from '@flex-development/pathe'
import { ifelse, includes, sift } from '@flex-development/tutils'
import ci from 'is-ci'
import tsconfigPaths from 'vite-tsconfig-paths'
import {
  defineConfig,
  type ConfigEnv,
  type UserConfig,
  type UserConfigExport
} from 'vitest/config'
import { BaseSequencer, type WorkspaceSpec } from 'vitest/node'
import Notifier from './__tests__/reporters/notifier'

/**
 * Vitest configuration export.
 *
 * @const {UserConfigExport} config
 */
const config: UserConfigExport = defineConfig((env: ConfigEnv): UserConfig => {
  /**
   * [`lint-staged`][1] check.
   *
   * [1]: https://github.com/okonet/lint-staged
   *
   * @const {boolean} LINT_STAGED
   */
  const LINT_STAGED: boolean = !!Number.parseInt(process.env.LINT_STAGED ?? '0')

  /**
   * Relative path to tsconfig file.
   *
   * @const {string} tsconfig
   */
  const tsconfig: string = 'tsconfig.typecheck.json'

  return {
    define: {},
    plugins: [tsconfigPaths({ parseNative: true, projects: [tsconfig] })],
    test: {
      allowOnly: !ci,
      benchmark: {
        include: ['**/__tests__/*.bench.spec.ts?(x)'],
        outputJson: '__tests__/benchmark.json',
        reporters: ['default', new Notifier()]
      },
      chaiConfig: {
        includeStack: true,
        showDiff: true,
        truncateThreshold: 0
      },
      clearMocks: true,
      coverage: {
        all: !LINT_STAGED,
        clean: true,
        cleanOnRerun: true,
        exclude: [
          '**/__mocks__/**',
          '**/__tests__/**',
          '**/interfaces/',
          '**/types/',
          '**/index.ts',
          '!src/index.ts'
        ],
        extension: ['.ts'],
        include: ['src'],
        provider: 'v8',
        reporter: [ci ? 'lcovonly' : 'html', 'text'],
        reportsDirectory: './coverage',
        skipFull: false
      },
      environment: 'node',
      environmentOptions: {},
      exclude: [
        '**/__tests__/*.bench.spec.ts?(x)',
        '.cache',
        '.git',
        '.idea',
        'dist',
        'node_modules'
      ],
      globalSetup: [],
      globals: true,
      hookTimeout: 10 * 1000,
      include: [
        `**/__tests__/*.${ifelse(LINT_STAGED, '{spec,spec-d}', 'spec')}.ts?(x)`
      ],
      mockReset: true,
      outputFile: {
        json: includes(['benchmark', 'typecheck'], env.mode)
          ? pathe.join('__tests__', pathe.addExt(env.mode, 'json'))
          : '__tests__/report.json'
      },
      passWithNoTests: true,
      reporters: sift([ifelse(ci, null, new Notifier()), 'json', 'verbose']),
      /**
       * Stores snapshots next to `file`'s directory.
       *
       * @param {string} file - Path to test file
       * @param {string} extension - Snapshot extension
       * @return {string} Custom snapshot path
       */
      resolveSnapshotPath(file: string, extension: string): string {
        return pathe.resolve(
          pathe.resolve(pathe.dirname(pathe.dirname(file)), '__snapshots__'),
          pathe.basename(file).replace(/\.spec.tsx?/, '') + extension
        )
      },
      restoreMocks: true,
      sequence: {
        /**
         * Sorting and sharding algorithm provider.
         *
         * @see {@linkcode BaseSequencer}
         *
         * @extends {BaseSequencer}
         */
        sequencer: class Sequencer extends BaseSequencer {
          /**
           * Determines test file execution order.
           *
           * @public
           * @override
           * @async
           *
           * @param {WorkspaceSpec[]} specs - Workspace spec objects
           * @return {Promise<WorkspaceSpec[]>} `files` sorted
           */
          public override async sort(
            specs: WorkspaceSpec[]
          ): Promise<WorkspaceSpec[]> {
            return (await super.sort(specs)).sort(([, file1], [, file2]) => {
              return file1.localeCompare(file2)
            })
          }
        }
      },
      setupFiles: ['./__tests__/setup/index.ts'],
      slowTestThreshold: 300 * (env.mode === 'benchmark' ? 13.75 : 1),
      snapshotFormat: {
        callToJSON: true,
        min: false,
        printBasicPrototype: false,
        printFunctionName: true
      },
      snapshotSerializers: ['__tests__/serializers/token.ts'],
      typecheck: {
        allowJs: false,
        checker: 'tsc',
        ignoreSourceErrors: false,
        include: ['**/__tests__/*.spec-d.ts'],
        only: true,
        tsconfig
      },
      unstubEnvs: true,
      unstubGlobals: true
    }
  }
})

export default config
