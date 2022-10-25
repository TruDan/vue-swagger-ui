import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { visualizer } from 'rollup-plugin-visualizer';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import checker from 'vite-plugin-checker';
import Components from 'unplugin-vue-components/vite';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import vue from '@vitejs/plugin-vue2';

/**
 * Vite Configure
 *
 * @see {@link https://vitejs.dev/config/}
 */
export default defineConfig(async ({ command, mode }) => {
  const config = {
    // https://vitejs.dev/config/shared-options.html#base
    base: './',
    // Resolver
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
        // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
        // process and buffer are excluded because already managed
        // by node-globals-polyfill
        /*
        _stream_duplex:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        _stream_passthrough:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        _stream_readable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        _stream_writable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        _stream_transform:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        assert: 'rollup-plugin-node-polyfills/polyfills/assert',
        */
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        // console: 'rollup-plugin-node-polyfills/polyfills/console',
        // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
        // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
        // events: 'rollup-plugin-node-polyfills/polyfills/events',
        // http: 'rollup-plugin-node-polyfills/polyfills/http',
        // https: 'rollup-plugin-node-polyfills/polyfills/http',
        // os: 'rollup-plugin-node-polyfills/polyfills/os',
        // path: 'rollup-plugin-node-polyfills/polyfills/path',
        process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
        // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
        querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        // stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        // string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
        // sys: 'util',
        // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
        url: 'rollup-plugin-node-polyfills/polyfills/url',
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
        // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      },
    },
    // https://vitejs.dev/config/server-options.html
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    plugins: [
      // Vue2
      // https://github.com/vitejs/vite-plugin-vue2
      vue(),
      // unplugin-vue-components
      // https://github.com/antfu/unplugin-vue-components
      Components({
        // generate `components.d.ts` global declarations
        // https://github.com/antfu/unplugin-vue-components#typescript
        dts: true,
        // auto import for directives
        directives: false,
        // resolvers for custom components
        resolvers: [
          // Vuetify
          VuetifyResolver(),
        ],
        // https://github.com/antfu/unplugin-vue-components#types-for-global-registered-components
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
      }),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: false,
        vueTsc: false,
        eslint: {
          lintCommand: 'eslint', // for example, lint .ts & .tsx
        },
      }),
    ],
    css: {
      postcss: {
        plugins: [
          // Fix vite build includes @charset problem
          // https://github.com/vitejs/vite/issues/5655
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      // https://vitejs.dev/config/#css-preprocessoroptions
      preprocessorOptions: {
        sass: {
          additionalData: [
            // vuetify variable overrides
            '@import "@/styles/variables.scss"',
            '',
          ].join('\n'),
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    // Build Options
    // https://vitejs.dev/config/build-options.html
    build: {
      // Build Target
      // https://vitejs.dev/config/build-options.html#build-target
      target: 'esnext',
      // Minify option
      // https://vitejs.dev/config/build-options.html#build-minify
      // minify: 'esbuild',
      minify: 'false',
      // https://vitejs.dev/config/build-options.html#build-sourcemap
      sourcemap: true,
      // Rollup Options
      // https://vitejs.dev/config/build-options.html#build-rollupoptions
      rollupOptions: {
        // @ts-ignore
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            vue: [
              'vue',
              'vue-router',
              'vue-router/composables',
              'vuex',
              '@logue/vue2-helpers',
              '@logue/vue2-helpers/teleport',
              '@logue/vue2-helpers/vue-router',
              '@logue/vue2-helpers/vuex',
            ],
            vuetify: [
              'vuetify/lib',
              '@logue/vue2-helpers/vuetify',
              'webfontloader',
            ],
            materialdesignicons: ['@mdi/font/css/materialdesignicons.css'],
          },
        },
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          rollupNodePolyFill(),
          // rollup-plugin-visualizer
          // https://github.com/btd/rollup-plugin-visualizer
          mode === 'analyze'
            ? visualizer({
              open: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              brotliSize: true,
            })
            : undefined,
          /*
          // if you use Code encryption by rollup-plugin-obfuscator
          // https://github.com/getkey/rollup-plugin-obfuscator
          obfuscator({
            globalOptions: {
              debugProtection: true,
            },
          }),
          */
        ],
      },
    },
    esbuild: {
      // Drop console when production build.
      drop: command === 'serve' ? [] : ['console'],
    },
  };

  return config;
});
