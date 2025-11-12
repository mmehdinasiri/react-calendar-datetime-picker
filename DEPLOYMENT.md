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
- A new GitHub Release is created
- Or manually triggered via GitHub Actions

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
- Changes are pushed to `main` or `modern-rewrite` branch
- Changes are made to `docs/` directory

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
- Triggers on GitHub Release creation
- Runs tests
- Builds library
- Publishes to npm

### `.github/workflows/deploy-docs.yml`
- Triggers on push to main/modern-rewrite
- Builds documentation website
- Deploys to GitHub Pages

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

