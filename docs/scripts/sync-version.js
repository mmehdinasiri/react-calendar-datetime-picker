#!/usr/bin/env node

/**
 * Script to sync version from root package.json to docs/app/config/version.ts
 */

const fs = require('fs')
const path = require('path')

const rootPackageJsonPath = path.join(__dirname, '../../package.json')
const versionConfigPath = path.join(__dirname, '../app/config/version.ts')

try {
  const rootPackageJson = JSON.parse(
    fs.readFileSync(rootPackageJsonPath, 'utf8')
  )
  const version = rootPackageJson.version

  const versionConfigContent = `// This file is auto-generated from package.json
// Run 'pnpm run sync:version' to update this file

export const CURRENT_VERSION = '${version}'
`

  fs.writeFileSync(versionConfigPath, versionConfigContent, 'utf8')
  console.log(`✅ Synced version ${version} to ${versionConfigPath}`)
} catch (error) {
  console.error('❌ Error syncing version:', error.message)
  process.exit(1)
}
