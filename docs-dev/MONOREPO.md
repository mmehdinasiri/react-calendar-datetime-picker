# Monorepo Setup

This repository is now configured as a monorepo containing both the library and documentation website.

## Structure

```
react-calendar-datetime-picker/
├── src/                    # Library source code
├── dist/                   # Built library (published to npm)
├── docs/                   # Documentation website (Next.js)
├── docs-dev/               # Developer documentation
│   ├── ARCHITECTURE.md     # Project architecture
│   ├── DEVELOPMENT.md      # Development guide
│   ├── DEPLOYMENT.md       # Deployment guide
│   ├── MONOREPO.md         # This file
│   ├── SETUP_COMPLETE.md   # Setup guide
│   └── VERSIONING.md       # Version management
├── examples/               # Example/playground app
├── .github/workflows/      # CI/CD workflows
│   ├── npm-publish.yml     # NPM publishing workflow
│   └── deploy-docs.yml     # GitHub Pages deployment
├── README.md               # Main user-facing README
├── CHANGELOG.md            # Version history
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

## Benefits

✅ **Single Repository**: Everything in one place  
✅ **Shared Dependencies**: Use pnpm workspaces  
✅ **Independent Deployments**: Library → NPM, Website → GitHub Pages  
✅ **Version Sync**: Easy to keep docs in sync with library  
✅ **Simplified Workflow**: One repo to manage

## Deployment

### Library (NPM)

- **Trigger**: GitHub Release creation
- **Workflow**: `.github/workflows/npm-publish.yml`
- **Output**: Published to npm registry

### Documentation (GitHub Pages)

- **Trigger**: Push to `main` branch only (when docs/ changes)
- **Workflow**: `.github/workflows/deploy-docs.yml`
- **Output**: Deployed to GitHub Pages
- **URL**: https://mmehdinasiri.github.io/react-calendar-datetime-picker/

## Next Steps

1. **Migrate Website Content**:
   - Follow instructions in `../docs/MIGRATION.md`
   - Copy files from the separate website repository
   - Update Next.js config for GitHub Pages

2. **Set Up GitHub Secrets**:
   - Add `NPM_TOKEN` for npm publishing
   - Configure GitHub Pages in repository settings

3. **Test Deployments**:
   - Test npm publish workflow
   - Test GitHub Pages deployment

4. **Archive Old Repo** (Optional):
   - Once migrated, you can archive the separate website repository

## Commands

```bash
# Install all dependencies
pnpm install

# Library development
pnpm run build:watch
pnpm run dev:examples

# Documentation development
pnpm run dev:docs
pnpm run build:docs

# Publish library (manual)
pnpm publish
```

## Workflows

### NPM Publish Workflow

- Runs on GitHub Release creation
- Tests → Builds → Publishes to npm

### Docs Deployment Workflow

- Runs on push to `main` branch only
- Builds library → Builds docs → Deploys to GitHub Pages

## Configuration Files

- `pnpm-workspace.yaml` - pnpm workspace configuration
- `.github/workflows/npm-publish.yml` - NPM publishing
- `.github/workflows/deploy-docs.yml` - GitHub Pages deployment
- `docs/next.config.js` - Next.js config for GitHub Pages
- `docs/package.json` - Website dependencies
