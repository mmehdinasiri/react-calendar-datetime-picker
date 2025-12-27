# E2E Test App

This is a dedicated test application for end-to-end tests of the React Calendar DateTime Picker library.

## Purpose

This app provides a **stable, isolated environment** for E2E tests, separate from the development examples in `examples/`. This ensures that:

1. **Tests remain stable** - Changes to development examples won't break tests
2. **Isolated testing** - Test scenarios are clearly defined and don't interfere with development
3. **Reliable selectors** - Uses `data-testid` attributes for stable element selection
4. **Focused scenarios** - Only includes what's needed for testing, nothing more

## Structure

- `src/App.tsx` - Main test app with all test scenarios
- `src/App.css` - Styles for the test app
- `src/main.tsx` - Entry point
- `src/index.css` - Base styles
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## Test Scenarios

The app includes the following test scenarios:

1. **DtPicker Basic** - Basic picker with Jalali calendar, clear button, today button
2. **DtPicker Gregorian** - Picker with Gregorian calendar system
3. **DtPicker Jalali** - Picker with Jalali calendar system
4. **DtPicker Range** - Picker with range selection type
5. **DtCalendar Basic** - Basic calendar with today button
6. **DtCalendar Gregorian** - Calendar with Gregorian system
7. **DtCalendar Jalali** - Calendar with Jalali system (RTL)

## Test IDs

All components and sections use `data-testid` attributes for reliable selection:

- Sections: `dtpicker-basic-section`, `dtcalendar-basic-section`, etc.
- Components: `dtpicker-basic`, `dtcalendar-basic`, etc.
- Containers: `dtpicker-basic-container`, `dtcalendar-basic-container`, etc.
- Results: `dtpicker-basic-result`, `dtcalendar-basic-result`, etc.

## Running

The test app runs on port **5005** (different from examples which runs on 3000).

```bash
cd tests/e2e-app
pnpm install
pnpm dev
```

## Important Notes

⚠️ **DO NOT** modify this app for development purposes. Use `examples/` for development and experimentation.

✅ This app should only be modified to:

- Add new test scenarios
- Fix test-related issues
- Improve test reliability

## Port Configuration

- **Examples app**: Port 3000 (for development)
- **E2E test app**: Port 5005 (for testing)

This separation ensures tests and development don't interfere with each other.
