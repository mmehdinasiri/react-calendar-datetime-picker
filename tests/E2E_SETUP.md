# E2E Testing Setup Guide

## How E2E Tests Work

Playwright E2E tests **automatically start the dev server** for you. You don't need to run it manually!

The Playwright config (`playwright.config.ts`) includes a `webServer` configuration that:
1. Automatically installs examples dependencies
2. Starts the examples dev server
3. Waits for it to be ready
4. Runs the tests
5. Shuts down the server when tests complete

## Running E2E Tests

Simply run:
```bash
pnpm run test:e2e
```

Playwright will handle everything automatically.

## Manual Server Mode (Optional)

If you want to run the dev server manually (e.g., for debugging), you can:

1. **Start the dev server manually:**
   ```bash
   cd examples
   pnpm install
   pnpm dev
   ```
   The server will start on `http://localhost:3000` (or whatever port is configured)

2. **Update Playwright config** to reuse the existing server:
   ```typescript
   webServer: {
     command: 'cd examples && pnpm dev',
     url: 'http://localhost:3000',  // Match your server port
     reuseExistingServer: true,     // Reuse if already running
     // ...
   }
   ```

3. **Run tests:**
   ```bash
   pnpm run test:e2e
   ```

## Port Configuration

The examples app runs on port **3000** by default (configured in `examples/vite.config.ts`).

If you change the port, make sure to update:
1. `examples/vite.config.ts` - server port
2. `playwright.config.ts` - baseURL and webServer.url

## Troubleshooting

### Timeout Error

If you see "Timed out waiting 120000ms from config.webServer":

1. **Check if port is correct:**
   - Examples should run on port 3000
   - Playwright config should match this port

2. **Check if dependencies are installed:**
   ```bash
   cd examples
   pnpm install
   ```

3. **Check if the library needs to be built:**
   - The examples app uses workspace aliases, so it doesn't need the library built
   - But if you see import errors, try: `pnpm run build`

4. **Check server logs:**
   - The webServer config has `stderr: 'pipe'` to see errors
   - Check Playwright output for server errors

### Port Already in Use

If port 3000 is already in use:

1. **Stop the existing server** or
2. **Change the port** in both `examples/vite.config.ts` and `playwright.config.ts`

### Server Won't Start

Make sure:
- Node.js and pnpm are installed
- Examples dependencies are installed: `cd examples && pnpm install`
- No syntax errors in examples code

## CI/CD

In CI (GitHub Actions), the webServer automatically starts and stops. No manual intervention needed!

