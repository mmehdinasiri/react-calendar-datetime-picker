# Deployment Guide

This repository contains both the library and documentation website in a monorepo structure.

## Repository Structure

```
react-calendar-datetime-picker/
├── src/              # Library source code
├── dist/             # Built library (published to npm)
├── docs/             # Documentation website (deployed to GitHub Pages)
├── examples/         # Example/playground app
└── .github/
    └── workflows/    # CI/CD workflows
```

## Library Deployment (NPM)

### Automatic Deployment

The library is automatically published to npm when:
- **A new GitHub Release is created** (recommended)
  - Go to: https://github.com/mmehdinasiri/react-calendar-datetime-picker/releases/new
  - Create a new release with a tag (e.g., `v2.0.0`)
  - The workflow runs automatically
- **Manual trigger via GitHub Actions UI** (`workflow_dispatch`)
  - Go to: Actions tab → "Publish to NPM" → "Run workflow"
  - Useful for testing or manual publishes

### Workflow Steps
1. Runs tests
2. Builds the library
3. Publishes to npm

### Manual Deployment

1. **Update version** in `package.json`
2. **Build the library**:
   ```bash
   pnpm run build
   ```
3. **Publish to npm**:
   ```bash
   pnpm publish --access public
   ```

### Prerequisites

- NPM_TOKEN secret must be set in GitHub repository settings
- You must be logged in to npm CLI

## Documentation Website Deployment (GitHub Pages)

### Automatic Deployment

The website is automatically deployed when:
- **Push to `main` branch** AND changes are in:
  - `docs/**` (any file in docs directory)
  - `package.json` (dependency changes)
  - `.github/workflows/deploy-docs.yml` (workflow changes)
- **Manual trigger via GitHub Actions UI** (`workflow_dispatch`)
  - Go to: Actions tab → "Deploy Documentation" → "Run workflow"

### Workflow Steps
1. Builds the library (for docs to use)
2. Builds the documentation website
3. Deploys to GitHub Pages

### Manual Deployment

1. **Build the website**:
   ```bash
   pnpm run build:docs
   ```
2. **Push to repository** - GitHub Actions will handle deployment

### GitHub Pages Configuration

1. Go to repository **Settings** → **Pages**
2. **Source**: Select "GitHub Actions"
3. The workflow will automatically deploy on push

### Website URL

The website will be available at:
- **Production**: https://mmehdinasiri.github.io/react-calendar-datetime-picker/

## Workflows

### `.github/workflows/npm-publish.yml`

**Trigger Conditions:**
- `release` event with type `created` (when GitHub Release is created)
- `workflow_dispatch` (manual trigger from Actions UI)

**What it does:**
1. Checks out code
2. Sets up pnpm and Node.js
3. Installs dependencies
4. Runs tests
5. Builds library
6. Publishes to npm

**Example:**
```bash
# 1. Update version in package.json
# 2. Commit and push
git add package.json
git commit -m "chore: bump version to 2.0.0"
git push

# 3. Create a GitHub Release
# Go to: https://github.com/mmehdinasiri/react-calendar-datetime-picker/releases/new
# Tag: v2.0.0
# Title: Version 2.0.0
# Click "Publish release"
# → Workflow automatically runs and publishes to npm
```

### `.github/workflows/deploy-docs.yml`

**Trigger Conditions:**
- `push` to branch: `main` only
- AND changes in paths:
  - `docs/**`
  - `package.json`
  - `.github/workflows/deploy-docs.yml`
- `workflow_dispatch` (manual trigger from Actions UI)

**What it does:**
1. Checks out code
2. Sets up pnpm and Node.js
3. Installs dependencies
4. Builds library (for docs to use)
5. Builds documentation website
6. Deploys to GitHub Pages

**Example:**
```bash
# Any push to main branch that changes docs/
git add docs/
git commit -m "docs: update documentation"
git push origin main
# → Workflow automatically runs and deploys to GitHub Pages
```

## Workflow Trigger Summary

| Workflow | Trigger | Frequency |
|----------|---------|-----------|
| **NPM Publish** | GitHub Release created | When you publish a new version |
| **Deploy Docs** | Push to main branch (docs changes) | Every time you update docs |

Both workflows can also be manually triggered from the Actions tab if needed.

## Local Development

### Library
```bash
pnpm run dev:examples  # Run examples app
pnpm run build:watch   # Watch mode build
```

### Documentation
```bash
pnpm run dev:docs      # Start docs dev server
pnpm run build:docs    # Build docs for production
```

## Troubleshooting

### NPM Publish Fails
- Check NPM_TOKEN secret is set correctly
- Verify package.json version is updated
- Ensure you have publish permissions on npm

### GitHub Pages Not Updating
- Check GitHub Actions workflow runs successfully
- Verify Pages source is set to "GitHub Actions"
- Check workflow has correct permissions

