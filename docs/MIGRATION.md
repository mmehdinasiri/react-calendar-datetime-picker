# Migrating Website from Separate Repo

This guide helps you migrate the website from the separate repository to this monorepo.

## Steps

1. **Clone the website repository** (if you haven't already):

   ```bash
   git clone https://github.com/mmehdinasiri/react-calendar-datetime-picker-website.git temp-website
   ```

2. **Copy website files to docs directory**:

   ```bash
   # From the root of this repo
   cp -r temp-website/* docs/
   cp -r temp-website/.* docs/ 2>/dev/null || true
   ```

3. **Update Next.js configuration** for GitHub Pages:
   - Update `docs/next.config.js` to set `basePath` and `output: 'export'`
   - See example below

4. **Update package.json** in docs directory:
   - Add the library as a dependency: `"react-calendar-datetime-picker": "workspace:*"`
   - Or use file path: `"react-calendar-datetime-picker": "file:.."`

5. **Install dependencies**:

   ```bash
   pnpm install
   ```

6. **Test locally**:

   ```bash
   pnpm run dev:docs
   ```

7. **Build and verify**:
   ```bash
   pnpm run build:docs
   ```

## Next.js Config for GitHub Pages

Update `docs/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/react-calendar-datetime-picker',
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig
```

## GitHub Pages Settings

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. The workflow will automatically deploy on push to main

## After Migration

Once migrated, you can:

- Archive or delete the separate website repository
- Update any links pointing to the old repo
- The website will be available at: https://mmehdinasiri.github.io/react-calendar-datetime-picker/
