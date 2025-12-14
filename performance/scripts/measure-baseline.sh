#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Measuring baseline performance on main branch..."

# 1. SETUP ISOLATION
# Define path OUTSIDE the current git repository to prevent config bleeding
BASELINE_DIR="$(dirname $GITHUB_WORKSPACE)/baseline-temp-env"
echo "Preparing isolated environment at: $BASELINE_DIR"

# Clean up any previous run & Move the checked-out main branch
rm -rf "$BASELINE_DIR"

if [ -d "main-branch" ]; then
  mv main-branch "$BASELINE_DIR"
  echo "✅ Moved main-branch to isolated directory"
else
  echo "❌ 'main-branch' directory not found. Checkout likely failed."
  echo "baseline_available=false" >> $GITHUB_OUTPUT
  exit 0
fi

# 2. SWITCH CONTEXT
cd "$BASELINE_DIR"

# 3. SAFETY CHECKS
if [ ! -f "package.json" ] || [ ! -f "pnpm-lock.yaml" ]; then
  echo "⚠️ Project structure differs (missing key files). Skipping baseline."
  echo "baseline_available=false" >> $GITHUB_OUTPUT
  exit 0
fi

# 4. INSTALL & BUILD
echo "Installing dependencies..."
# Use || { ... } to handle errors gracefully in Bash scripts
pnpm install --frozen-lockfile || { echo "⚠️ Main branch install failed."; echo "baseline_available=false" >> $GITHUB_OUTPUT; exit 0; }

echo "Building..."
pnpm run build || { echo "⚠️ Main branch build failed."; echo "baseline_available=false" >> $GITHUB_OUTPUT; exit 0; }

# 5. MEASURE BUNDLE SIZE (Use script from PR, run on Main code)
echo "Checking bundle size..."
# CRITICAL: Use the script path from GITHUB_WORKSPACE (the PR branch)
node "$GITHUB_WORKSPACE/performance/scripts/check-bundle-size.js" || echo "Bundle check failed"

# Copy bundle metrics if generated
if [ -f "performance/results/bundle-metrics.json" ]; then
  mkdir -p "$GITHUB_WORKSPACE/performance/results/"
  cp performance/results/bundle-metrics.json "$GITHUB_WORKSPACE/performance/results/bundle-metrics-main.json"
  echo "✅ Baseline bundle metrics saved"
fi

# 6. RUN PERFORMANCE TESTS (Use script from PR)
echo "Running performance tests..."
mkdir -p performance/results/

# CRITICAL: Use the extraction script path from GITHUB_WORKSPACE (the PR branch)
if node "$GITHUB_WORKSPACE/performance/scripts/extract-performance-metrics.js"; then
  if [ -f "performance/results/performance-metrics.json" ]; then
    echo "✅ Baseline metrics generated. Copying to workspace..."
    mkdir -p "$GITHUB_WORKSPACE/performance/results/"
    cp performance/results/performance-metrics.json "$GITHUB_WORKSPACE/performance/results/performance-metrics-main.json"
    
    echo "baseline_available=true" >> $GITHUB_OUTPUT
    echo "✅ Baseline performance metrics saved successfully"
  else
    echo "⚠️ Performance metrics file not generated."
    echo "baseline_available=false" >> $GITHUB_OUTPUT
  fi
else
  echo "⚠️ Failed to run performance tests on main branch."
  echo "baseline_available=false" >> $GITHUB_OUTPUT
fi

# 7. CLEANUP
cd "$GITHUB_WORKSPACE"
rm -rf "$BASELINE_DIR"