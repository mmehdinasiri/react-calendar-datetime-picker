#!/bin/bash

# Exit on error
set -e

echo "Measuring baseline performance on main branch..."

# 1. SETUP ISOLATION
# Define path OUTSIDE the current git repository to prevent config bleeding
BASELINE_DIR="$(dirname $GITHUB_WORKSPACE)/baseline-temp-env"
echo "Preparing isolated environment at: $BASELINE_DIR"

# Clean up & Move
rm -rf "$BASELINE_DIR"

if [ -d "main-branch" ]; then
  mv main-branch "$BASELINE_DIR"
  echo "✅ Moved main-branch to isolated directory"
else
  echo "❌ 'main-branch' directory not found."
  echo "baseline_available=false" >> $GITHUB_OUTPUT
  exit 0
fi

# 2. SWITCH CONTEXT
cd "$BASELINE_DIR"

# 3. SAFETY CHECKS (Skip if project structure changed)
if [ ! -f "package.json" ] || [ ! -d "performance" ] || [ ! -f "pnpm-lock.yaml" ]; then
  echo "⚠️ Project structure differs. Skipping baseline."
  echo "baseline_available=false" >> $GITHUB_OUTPUT
  exit 0
fi

# 4. INSTALL & BUILD
echo "Installing dependencies..."
pnpm install --frozen-lockfile || { echo "baseline_available=false" >> $GITHUB_OUTPUT; exit 0; }

echo "Building..."
pnpm run build || { echo "baseline_available=false" >> $GITHUB_OUTPUT; exit 0; }

# 5. RUN PERFORMANCE TESTS
echo "Running performance tests..."
mkdir -p performance/results/

# Run the extraction script
if node performance/scripts/extract-performance-metrics.js; then
  # Copy results back to original workspace
  if [ -f "performance/results/performance-metrics.json" ]; then
    echo "✅ Baseline metrics generated. Copying to workspace..."
    mkdir -p "$GITHUB_WORKSPACE/performance/results/"
    cp performance/results/performance-metrics.json "$GITHUB_WORKSPACE/performance/results/performance-metrics-main.json"
    
    echo "baseline_available=true" >> $GITHUB_OUTPUT
    echo "✅ Baseline performance metrics saved successfully"
  else
    echo "baseline_available=false" >> $GITHUB_OUTPUT
  fi
else
  echo "⚠️ Failed to run performance tests on main branch."
  echo "baseline_available=false" >> $GITHUB_OUTPUT
fi

# 6. CLEANUP
cd "$GITHUB_WORKSPACE"
rm -rf "$BASELINE_DIR"