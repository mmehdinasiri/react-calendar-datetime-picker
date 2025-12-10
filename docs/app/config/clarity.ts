// Microsoft Clarity configuration
// Get your project ID from https://clarity.microsoft.com/
// Set NEXT_PUBLIC_CLARITY_PROJECT_ID in your environment variables
// or replace the value below with your project ID
export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || ''

// Enable Clarity only in production or when project ID is set
export const ENABLE_CLARITY =
  process.env.NODE_ENV === 'production' && CLARITY_PROJECT_ID !== ''
