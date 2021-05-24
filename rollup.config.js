import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import scss from 'rollup-plugin-scss'
import svg from 'rollup-plugin-svg'
import svgr from '@svgr/rollup'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import strip from '@rollup/plugin-strip'

export default {
  input: './src/index.tsx',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: false,
    preserveModules: false,
    preserveModulesRoot: 'src'
  },

  external: ['react', 'react-dom'],
  plugins: [
    svg(),
    svgr(),
    scss({
      output: './dist/index.css',
      outputStyle: 'compressed'
    }),
    resolve({ extensions: ['.tsx', '.ts', '.js', 'jsx'] }),
    commonjs({
      sourceMap: false
    }),
    strip({
      include: '**/*.(ts|tsx|js|ts)',
      debugger: false,
      functions: ['console.log']
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist'
    }),
    babel({
      exclude: 'node_modules/**'
    }),

    // gzipPlugin(),
    filesize(),
    terser(),
    uglify(),
    visualizer({
      filename: 'bundle-analysis.html',
      open: false
    })
  ]
}
