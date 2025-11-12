const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages base path
  basePath: isProd ? '/react-calendar-datetime-picker' : '',
  assetPrefix: isProd ? '/react-calendar-datetime-picker' : '',
  // Static export for GitHub Pages
  output: 'export',
  // Add trailing slash for GitHub Pages
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Environment variables
  env: {
    prefix: isProd ? '/react-calendar-datetime-picker' : '',
  },
  // Sass options
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // Webpack configuration
  webpack(config, options) {
    const { dev, isServer } = options

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    return config
  },
}

module.exports = nextConfig
