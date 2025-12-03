# Development Guide

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development Commands

```bash
# Build library in watch mode
pnpm run build:watch

# Run examples/playground (in another terminal)
pnpm run dev:examples

# Type checking
pnpm run typecheck

# Linting
pnpm run lint
pnpm run lint:fix

# Formatting
pnpm run format

# Testing
pnpm test
pnpm run test:watch
pnpm run test:coverage
```

## 📦 Build System

### Library Build

The library builds to:

- `dist/index.mjs` - ESM format
- `dist/index.cjs` - CommonJS format
- `dist/style.css` - Extracted CSS
- `dist/index.d.ts` - TypeScript definitions

### Build Process

1. TypeScript compilation (`tsc`)
2. Vite library build
3. CSS extraction
4. Type definition generation

## 🎨 Styling

### SCSS Structure

- `src/styles/variables.scss` - CSS variables for theming
- `src/styles/index.scss` - Main styles entry point

### CSS Variables

All styling uses CSS custom properties for easy theming:

```scss
--calendar-primary
--calendar-bg
--calendar-text
// ... see variables.scss for full list
```

### Adding Component Styles

1. Create component-specific SCSS file in `src/styles/components/`
2. Import in `src/styles/index.scss`
3. Use CSS variables for consistent theming

## 📝 TypeScript

### Type Exports

All public types are exported from `src/index.ts`:

```typescript
export type { Day, Range, Multi, CalendarLocale, CalendarType }
```

### Component Props

- Fully typed with TypeScript interfaces
- JSDoc comments for IntelliSense
- Default values documented

### Type Checking

```bash
pnpm run typecheck  # Check types without emitting
```

## 🧪 Testing

### Writing Tests

- Place test files next to source files: `Component.test.tsx`
- Use Vitest and Testing Library
- Test setup in `tests/setup.ts`

### Example Test

```typescript
import { render, screen } from '@testing-library/react'
import { DtPicker } from '../DtPicker'

test('renders picker', () => {
  render(<DtPicker onChange={() => {}} />)
  // assertions
})
```

## 🏗️ Component Development

### Component Structure

````typescript
import React from 'react'
import type { ComponentProps } from '../types'

export interface MyComponentProps {
  /** Prop description */
  prop: string
}

/**
 * Component description
 * @example
 * ```tsx
 * <MyComponent prop="value" />
 * ```
 */
export const MyComponent: React.FC<MyComponentProps> = ({ prop }) => {
  return <div>{prop}</div>
}

MyComponent.displayName = 'MyComponent'
````

### Best Practices

1. ✅ Use TypeScript for all components
2. ✅ Add JSDoc comments
3. ✅ Export prop types
4. ✅ Use CSS variables
5. ✅ Support RTL (`dir="rtl"`)
6. ✅ Add `displayName` for debugging

## 📚 Examples/Playground

The `examples/` directory contains a playground app:

- Fast HMR with Vite
- Aliases library source for live development
- Perfect for testing components

```bash
pnpm run dev:examples  # Start playground
```

## 🔧 Configuration Files

- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript config (dev)
- `tsconfig.build.json` - TypeScript config (build)
- `vitest.config.ts` - Test configuration
- `.eslintrc.cjs` - Linting rules
- `.prettierrc.json` - Formatting rules

## 📦 Publishing

### Pre-publish Checklist

1. ✅ Run `pnpm run typecheck`
2. ✅ Run `pnpm run lint`
3. ✅ Run `pnpm test`
4. ✅ Run `pnpm run build`
5. ✅ Check `dist/` output
6. ✅ Update version in `package.json`
7. ✅ Update `CHANGELOG.md`

### Publish Command

```bash
pnpm publish --access public
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) and [VERSIONING.md](./VERSIONING.md) for detailed publishing guide.

The `prepublishOnly` script automatically:

- Cleans `dist/`
- Builds the library
