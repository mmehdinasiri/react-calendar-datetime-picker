#!/bin/bash

# Clean rebuild script for react-calendar-datetime-picker
# This ensures no cached files are used

set -e

echo "🧹 Starting clean rebuild..."

# 1. Clean library build artifacts
echo "📦 Cleaning library build artifacts..."
pnpm run clean

# 2. Clean Next.js cache (docs)
echo "📚 Cleaning Next.js cache..."
rm -rf docs/.next

# 3. Clean TypeScript build info
echo "🔷 Cleaning TypeScript build info..."
find . -name "tsconfig.tsbuildinfo" -delete
find . -name "*.tsbuildinfo" -delete

# 4. Clean node_modules (ONLY if you're having persistent issues)
# Usually NOT needed - pnpm install refreshes the file link automatically
# Uncomment the next 2 lines only if normal rebuild doesn't work:
# echo "🗑️  Cleaning node_modules (nuclear option)..."
# rm -rf docs/node_modules node_modules

# 5. Rebuild library
echo "🔨 Rebuilding library..."
pnpm run build

# 6. Remove only the calendar lib from node_modules and reinstall (much faster)
echo "📥 Refreshing calendar library link..."
cd docs
rm -rf node_modules/react-calendar-datetime-picker
pnpm install
cd ..

echo "✅ Clean rebuild complete!"
echo ""
echo "To start the docs dev server, run:"
echo "  pnpm run dev:docs"

