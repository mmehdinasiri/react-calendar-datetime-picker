# Architecture & Development Guide

## 📁 Project Structure

```
react-calendar-datetime-picker/
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── DtPicker.tsx   # Date picker with input
│   │   ├── DtCalendar.tsx # Standalone calendar
│   │   └── index.ts       # Component exports
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # SCSS styles
│   │   ├── variables.scss # CSS variables/theming
│   │   └── index.scss     # Main styles entry
│   └── index.ts           # Main library entry point
├── docs/                   # Documentation website (Next.js)
├── docs-dev/               # Developer documentation
├── examples/               # Example/playground app
├── tests/                  # Test files
├── dist/                   # Build output (generated)
├── README.md               # Main user-facing README
├── CHANGELOG.md            # Version history
└── package.json
```

## 🏗️ Build System

### Vite Configuration

- **Library Mode**: Builds as ESM and CJS formats
- **CSS Extraction**: Automatically extracts SCSS to `dist/style.css`
- **TypeScript**: Generates `.d.ts` files with declaration maps
- **Tree-shaking**: Optimized for tree-shaking in consuming apps
- **Source Maps**: Generated for debugging

### Build Outputs

- `dist/index.mjs` - ESM format
- `dist/index.cjs` - CommonJS format
- `dist/style.css` - Extracted CSS
- `dist/index.d.ts` - TypeScript definitions

## 🎨 Styling Strategy

### SCSS with CSS Variables

- **Variables**: Defined in `src/styles/variables.scss`
- **Theming**: Uses CSS custom properties for easy theming
- **RTL Support**: Built-in RTL support via `[dir='rtl']` selector
- **Extraction**: CSS is extracted to a single file during build

### CSS Variables Available

```scss
--calendar-primary
--calendar-bg
--calendar-text
--calendar-border
// ... and more
```

## 📦 Type System

### Type Exports

All types are exported from the main entry:

```typescript
import type {
  Day,
  Range,
  Multi,
  CalendarLocale
} from 'react-calendar-datetime-picker'
```

### Component Props

- Fully typed with TypeScript
- JSDoc comments for IntelliSense
- Default values documented

## 🧪 Testing

### Setup

- **Vitest**: Fast unit testing
- **Testing Library**: React component testing
- **jsdom**: DOM environment for tests

### Running Tests

```bash
pnpm test              # Run once
pnpm run test:watch    # Watch mode
pnpm run test:coverage # With coverage
```

## 🚀 Development

### Local Development

```bash
# Build library in watch mode
pnpm run build:watch

# Run examples/playground
pnpm run dev:examples
```

### Examples/Playground

Located in `examples/` directory:

- Uses Vite for fast HMR
- Aliases library source for live development
- Perfect for testing components during development

## 📝 Code Quality

### Linting

- **ESLint**: TypeScript + React rules
- **Prettier**: Code formatting
- **Husky** (optional): Pre-commit hooks

### Type Checking

```bash
pnpm run typecheck  # TypeScript type checking
```

## 🎯 Best Practices

### Component Development

1. Use TypeScript for all components
2. Add JSDoc comments for props
3. Export component props types
4. Use CSS variables for styling
5. Support RTL by default

### State Management

- Use React Context for shared state
- Custom hooks for reusable logic
- Keep components pure when possible

### Performance

- Use `React.memo` for expensive components
- Lazy load heavy components if needed
- Optimize re-renders with proper dependencies

## 📚 Documentation

### JSDoc Comments

All public APIs should have JSDoc comments:

````typescript
/**
 * Component description
 * @example
 * ```tsx
 * <Component prop="value" />
 * ```
 */
````

### Type Definitions

- Export all public types
- Use descriptive type names
- Document complex types

## 🔧 Configuration Files

- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript config (development)
- `tsconfig.build.json` - TypeScript config (build)
- `vitest.config.ts` - Test configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc.json` - Prettier formatting
