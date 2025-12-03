# GitHub Branch Protection Setup Guide

This guide explains how to set up branch protection rules to ensure all tests pass before merging pull requests to the `main` branch.

## Prerequisites

- Admin access to the GitHub repository
- CI workflow file created (`.github/workflows/ci.yml`)

## Setting Up Branch Protection

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click on **Settings** (top menu)
   - Click on **Branches** (left sidebar)

2. **Add Branch Protection Rule**
   - Click **Add rule** or **Add branch protection rule**
   - In the **Branch name pattern** field, enter: `main`

3. **Configure Protection Rules**

   **Required Checks:**
   - ✅ Check **Require a pull request before merging**
     - ✅ Require approvals: `1` (or your preferred number)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   
   - ✅ Check **Require status checks to pass before merging**
     - ✅ Check **Require branches to be up to date before merging**
     - In the search box, search for and select:
       - `test / Run Tests` (or `CI Tests / Run Tests`)
       - `test / Test Coverage` (optional, but recommended)
   
   - ✅ Check **Require conversation resolution before merging** (optional but recommended)
   
   - ✅ Check **Do not allow bypassing the above settings** (recommended for security)

   **Optional but Recommended:**
   - ✅ Check **Require linear history** (keeps git history clean)
   - ✅ Check **Include administrators** (applies rules to admins too)

4. **Save the Rule**
   - Click **Create** or **Save changes**

## What This Does

Once configured, the branch protection will:

- ✅ **Block merges** if the CI workflow fails
- ✅ **Require PR reviews** before merging
- ✅ **Ensure tests pass** before allowing merge
- ✅ **Prevent force pushes** to main branch
- ✅ **Prevent deletion** of main branch

## Workflow Status Checks

The CI workflow (`ci.yml`) creates the following status checks:

- `test / Run Tests` - Runs all unit and E2E tests
- `test / Test Coverage` - Generates coverage report (runs on PRs only)

Both checks must pass for a PR to be mergeable.

## Testing the Setup

1. Create a test branch:
   ```bash
   git checkout -b test-branch-protection
   ```

2. Make a small change (e.g., add a comment)

3. Create a pull request targeting `main`

4. Verify that:
   - The CI workflow runs automatically
   - The PR shows "Required" status checks
   - You cannot merge until checks pass

## Troubleshooting

### Status checks not appearing

- Ensure the workflow file is in `.github/workflows/ci.yml`
- Check that the workflow runs successfully at least once
- Wait a few minutes after pushing - GitHub needs to register the checks

### Cannot find status check in branch protection

- Make sure the workflow has run at least once
- The check name format is: `{job-name} / {step-name}`
- In our case: `test / Run Tests` and `test / Test Coverage`

### Workflow fails but you want to merge anyway

- If you have admin access and bypass is enabled, you can still merge
- However, it's recommended to fix the failing tests instead
- Check the workflow logs to see what failed

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)

