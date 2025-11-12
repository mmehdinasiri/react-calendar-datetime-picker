# Documentation Website

This directory contains the documentation website for `react-calendar-datetime-picker`.

The website is built with Next.js and deployed to GitHub Pages.

## Setup

The website uses the local library from the parent directory via pnpm workspace.

## Development

```bash
# Install all dependencies (from root)
pnpm install

# Start development server
pnpm run dev:docs

# Build for production
pnpm run build:docs

# Start production server (after build)
pnpm run start:docs
```

## Migration from Separate Repo

See [MIGRATION.md](./MIGRATION.md) for instructions on migrating the website from the separate repository.

## Deployment

The website is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

The website is available at: https://mmehdinasiri.github.io/react-calendar-datetime-picker/

## Structure

```
docs/
├── pages/          # Next.js pages
├── components/     # React components
├── styles/         # Styles
├── public/         # Static assets
└── package.json    # Dependencies
```
