# Version Management Guide

## How Versioning Works

### Current Version

The current version in `package.json` is **2.0.0** (for the modern rewrite).

The last published version on npm is **1.7.5** (from the old codebase).

### Version Source

The npm publish workflow gets the version from:

1. **GitHub Release Tag** (automatic):
   - When you create a GitHub Release with tag `v2.0.0` (or `2.0.0`)
   - The workflow extracts the version from the tag
   - Updates `package.json` to match the release tag
   - Publishes to npm with that version

2. **package.json** (manual trigger):
   - When manually triggering the workflow
   - Uses the version currently in `package.json`

## Publishing Process

### Step 1: Update Version in package.json

Before creating a release, update the version in `package.json`:

```bash
# For patch version (1.7.5 → 1.7.6)
pnpm version patch --no-git-tag-version

# For minor version (1.7.5 → 1.8.0)
pnpm version minor --no-git-tag-version

# For major version (1.7.5 → 2.0.0)
pnpm version major --no-git-tag-version

# Or manually edit package.json
```

### Step 2: Commit and Push

```bash
git add package.json
git commit -m "chore: bump version to X.Y.Z"
git push origin main
```

### Step 3: Create GitHub Release

1. Go to: https://github.com/mmehdinasiri/react-calendar-datetime-picker/releases/new
2. **Tag version**: Enter `v2.0.0` (must match package.json version)
3. **Release title**: `Version 2.0.0` (or descriptive title)
4. **Description**: Add release notes
5. Click **"Publish release"**

### Step 4: Automatic Publishing

The workflow will:

1. Extract version from the release tag (`v2.0.0` → `2.0.0`)
2. Update `package.json` to match (if different)
3. Run tests
4. Build the library
5. Publish to npm

## Version Sync

The workflow ensures:

- ✅ GitHub Release tag version matches package.json
- ✅ Published npm version matches the release tag
- ✅ Version consistency across all sources

## Important Notes

⚠️ **Version Conflict**: If you merge `modern-rewrite` (v2.0.0) to `main` before publishing:

- The `main` branch will have v2.0.0 in package.json
- But npm still has v1.7.5 published
- You should publish v2.0.0 as a new major version

### Recommended Approach

1. **Before merging to main**:
   - Decide on the version (2.0.0 for major rewrite)
   - Update package.json to that version
   - Commit and push

2. **After merging to main**:
   - Create GitHub Release with tag `v2.0.0`
   - Workflow will publish to npm automatically

3. **For future versions**:
   - Follow semantic versioning (semver)
   - Update package.json first
   - Create matching GitHub Release tag

## Semantic Versioning

- **MAJOR** (2.0.0): Breaking changes, major rewrite
- **MINOR** (1.8.0): New features, backward compatible
- **PATCH** (1.7.6): Bug fixes, backward compatible

## Checking Current Versions

```bash
# Check package.json version
cat package.json | grep version

# Check npm published version
pnpm view react-calendar-datetime-picker version

# Check all npm versions
pnpm view react-calendar-datetime-picker versions
```
