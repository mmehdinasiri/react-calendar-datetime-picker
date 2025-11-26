const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sass options
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  // Webpack configuration
  webpack(config, options) {
    const { dev, isServer } = options

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    return config
  }
}

module.exports = nextConfig
