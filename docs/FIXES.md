# Migration Fixes Needed

## TypeScript Fixes

Some `onChange` handlers need to be wrapped in arrow functions because the library expects `(date: unknown) => void` but React's `setState` is typed as `Dispatch<SetStateAction<T>>`.

### Pattern to Fix:

```typescript
// Before
<DtPicker onChange={setState} />

// After
<DtPicker onChange={(date) => setState(date)} />
```

### Files that may need fixes:

- `docs/pages/docs/examples.tsx` - Multiple instances
- `docs/pages/docs/typescript.tsx` - Multiple instances
- `docs/pages/docs/utilities.tsx` - Multiple instances
- `docs/pages/docs/get-started.tsx` - 1 instance
- `docs/pages/index.tsx` - Multiple instances

These can be fixed incrementally as you test the website.

## Next.js Config

- Removed `webpackDevMiddleware` (not supported in Next.js 15)
- Updated `basePath` for GitHub Pages deployment

## Dependencies

- Updated to Next.js 15
- Updated React to 19
- Added eslint-config-next
- Updated Tailwind to v3 syntax
