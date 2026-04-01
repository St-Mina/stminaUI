# stminaUI — Frontend (Angular + TypeScript)

A **TypeScript / Angular 17** single-page application scaffold with a structured Git workflow, automated CI/CD pipelines, and protected branch rules.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Local Development Setup](#local-development-setup)
3. [Branch Strategy](#branch-strategy)
4. [Git Workflow — Step by Step](#git-workflow--step-by-step)
5. [CI/CD Pipelines](#cicd-pipelines)
6. [Branch Protection Rules (GitHub Settings)](#branch-protection-rules-github-settings)
7. [VS Code Configuration](#vs-code-configuration)

---

## Tech Stack

| Tool | Version |
|------|---------|
| Angular | 17 |
| TypeScript | ~5.4 |
| Node.js | 20 (LTS) |
| Package manager | npm |
| Style | SCSS |

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/St-Mina/stminaUI.git
cd stminaUI

# 2. Install dependencies
npm install

# 3. Start the dev server on http://localhost:4200 (opens Chrome automatically via VS Code)
npm start
```

> **VS Code users:** Press **F5** (or use the *Run and Debug* panel → *Launch Chrome (localhost:4200)*) to start the dev server and attach Chrome in one step.

---

## Branch Strategy

```
master  ←── REL YYYY,MM,DD  ←── qc  ←── dev / feature branches
```

| Branch | Purpose | Direct commits | Merges require |
|--------|---------|---------------|----------------|
| `master` | Source of truth — production-ready code | ❌ Blocked | ✅ PR approval + CI pass |
| `qc` | Quality-control / staging gate | ❌ Blocked | ✅ PR approval |
| `dev` | Active development integration branch | ✅ Allowed | — |
| `REL YYYY,MM,DD` | Immutable release snapshot (e.g. `REL 2024,06,15`) | ❌ Once created | Used to open PR → `master` |

---

## Git Workflow — Step by Step

### 1 — Developer creates a feature or fix branch off `dev`

```bash
git checkout dev
git pull origin dev
git checkout -b feature/my-new-feature
```

### 2 — Developer opens a Pull Request into `qc`

Push the branch and open a PR targeting **`qc`**:

```bash
git push origin feature/my-new-feature
# Open PR on GitHub: base = qc, compare = feature/my-new-feature
```

### 3 — Code review on `qc` PR

- At least **one reviewer** must approve the PR before it can be merged.  
- The CODEOWNERS file automatically requests `@St-Mina` for review.  
- Address all review comments, then the reviewer approves and merges.

### 4 — QC deployment (manual trigger)

After the PR is merged into `qc`, the **Deploy to QC** workflow is available:

- GitHub → **Actions** → *Deploy to QC* → **Run workflow**  
  *(The workflow also fires automatically on every merge into `qc`.)*

Verify the build in the QC environment before cutting a release.

### 5 — Create a release branch

Once QC is approved, cut a release branch from `qc` using the naming convention `REL YYYY,MM,DD`:

```bash
git checkout qc
git pull origin qc
git checkout -b "REL 2024,06,15"
git push origin "REL 2024,06,15"
```

### 6 — Open a Pull Request from the release branch into `master`

```
base: master   ←   compare: REL 2024,06,15
```

- The **CI pipeline** runs automatically:
  - `npm ci` — clean dependency install  
  - `npm audit` — security vulnerability scan  
  - `npm run build -- --configuration production` — production compile  
  - `npm test -- --watch=false --browsers=ChromeHeadless` — unit tests  
- A reviewer approves the PR; direct merges to `master` without approval are **blocked**.

### 7 — Merge into `master`

Once CI passes and approval is granted, merge the release PR.

### 8 — Deploy from `master` (manual trigger)

GitHub → **Actions** → *Deploy to Production* → **Run workflow**

Choose the target environment:

| Choice | What happens |
|--------|-------------|
| **QC** | Deploys the master build to the QC environment (smoke-test before prod) |
| **Production** | Deploys the master build to the production environment |

---

## CI/CD Pipelines

| Workflow file | Trigger | Purpose |
|---------------|---------|---------|
| `.github/workflows/ci.yml` | Push / PR → `master` | Build, audit, test |
| `.github/workflows/deploy-qc.yml` | Merge into `qc` **or** manual | Deploy to QC environment |
| `.github/workflows/deploy-prod.yml` | Manual (choose QC or Production) | Deploy to QC or Production from `master` |

---

## Branch Protection Rules (GitHub Settings)

The following rules **must be configured manually** in  
**GitHub → Settings → Branches → Branch protection rules**.

### `master`

| Rule | Value |
|------|-------|
| Require a pull request before merging | ✅ |
| Required approving reviews | **1** (minimum) |
| Dismiss stale reviews on new push | ✅ |
| Require status checks to pass (CI) | ✅ — `Build, Lint & Test` |
| Require branches to be up to date | ✅ |
| Do not allow bypassing the above settings | ✅ |
| Restrict who can push (direct commits) | Blocked for all — only PRs allowed |

### `qc`

| Rule | Value |
|------|-------|
| Require a pull request before merging | ✅ |
| Required approving reviews | **1** (minimum) |
| Dismiss stale reviews on new push | ✅ |
| Do not allow bypassing the above settings | ✅ |

---

## VS Code Configuration

All VS Code config lives in `.vscode/` and is committed to the repository so every developer shares the same setup.

| File | Purpose |
|------|---------|
| `.vscode/launch.json` | **F5** launches Chrome at `http://localhost:4200/` after running `npm start` |
| `.vscode/tasks.json` | Defines the `npm: start` and `npm: test` background tasks used by the debugger |
| `.vscode/extensions.json` | Recommended extensions (Angular Language Service, etc.) |

Press **F5** in VS Code to:
1. Run `npm start` (starts Angular dev server on port 4200)
2. Launch Google Chrome pointed at `http://localhost:4200/`
3. Attach the VS Code debugger to Chrome (breakpoints in TypeScript work out of the box)

