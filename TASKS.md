# ⚔️ Warcraft Habit Tracker — Implementation & Fixes Roadmap

This checklist tracks the critical fixes, architectural completions, and refactoring tasks required to make the codebase production-ready.

---

## 🚨 Phase 1: Security & Database (P0 Blockers)
These issues prevent multi-user isolation, secure database connections, or basic user authentication.

- [ ] **Implement Supabase Auth**
  - [ ] Create `src/app/hooks.server.ts` to handle session validation and populate `event.locals.session`.
  - [ ] Define types for `App.Locals` in `src/app/app.d.ts`.
  - [ ] Implement route guards to redirect unauthenticated users to `/auth/login`.
  - [ ] Complete the Supabase client initialization in `src/supabase/index.ts`.
  - [ ] Implement the login form and page logic in `src/auth/login.form.svelte` and `src/auth/login.page.svelte`.

- [ ] **Establish Multi-Tenant Data Isolation**
  - [ ] Create a migration to add a `userId` column (UUID, referencing `auth.users(id)`) to the `quests` table.
  - [ ] Enable Row-Level Security (RLS) on the `quests` table in Supabase.
  - [ ] Add RLS policies:
    - [ ] `SELECT`, `UPDATE`, `DELETE` where `auth.uid() = user_id`.
    - [ ] `INSERT` with check `auth.uid() = user_id`.

- [ ] **Secure the Database Connection**
  - [ ] Update `src/drizzle/server/index.ts` to support SSL and connection pooling.
  - [ ] Set `prepare: false` when connecting via Supabase's transaction pooler (Supavisor) to prevent prepared statement errors.
  - [ ] Add environment variable validation to crash early at boot if `DATABASE_URL` is missing.

- [ ] **Fix PostgreSQL `updatedAt` Auto-Update**
  - [ ] Remove the MySQL-only `.$onUpdate()` from `src/quest/store/schema.ts`.
  - [ ] Create a PostgreSQL trigger in a migration to automatically update the `updated_at` timestamp on row updates.

---

## 💾 Phase 2: Data Integrity & Form Fixes (P0/P1)
These issues cause silent data loss or prevent forms from submitting correctly.

- [ ] **Fix Todo Deadline Data Loss**
  - [ ] Connect the calendar picker's `duedate` state to `$formData.dueDate` in `src/habit/create.form.svelte` using an `$effect`.
  - [ ] Update the server action in `src/habit/server/page.ts` to map and insert `timeframe` and `dueDate` into the database.
  - [ ] Add cross-field validation in `src/habit/schema.ts` to require `dueDate` when `dueDateType` is set to `'custom'`.

- [ ] **Fix Form Validation Gaps**
  - [ ] Add `'days'` to `STEP_FIELDS[3]` in `create.form.svelte` so day selection is validated before moving to the final step.
  - [ ] Remove the dead special-case validation block for days on step 4.
  - [ ] Standardize `z.coerce.number()` for the `target` field across both daily and habit schemas in `src/habit/schema.ts`.

---

## 🧹 Phase 3: Code Quality & Refactoring (P2)
These tasks address technical debt, code duplication, and logic fragility.

- [ ] **Deduplicate Constants**
  - [ ] Consolidate all shared constants (icons, colors, days, types) into `src/quest/consts/ui.ts`.
  - [ ] Delete `src/habit/consts.ts` and update imports in the `habit` module to point to the `quest` constants.

- [ ] **Harden `questify` Logic**
  - [ ] Add a guard in `src/quest/lib.ts` to handle empty inputs or inputs consisting only of stop-words (e.g., "do it").
  - [ ] Refine keyword matching to prevent false positives (e.g., "ready" matching "read").
  - [ ] Replace the fragile `for...in` loop with a deterministic key iteration.
  - [ ] Clean up hardcoded template indices and delegate to the `TEMPLATES` array.

- [ ] **Clean Up Dead Code & Stubs**
  - [ ] Delete empty placeholder files (e.g., `src/quest/schema.ts`, empty server API files) or implement them.
  - [ ] Remove debug `console.log($allErrors)` from `create.form.svelte`.

---

## 🧪 Phase 4: Testing & Observability (P1/P2)
These tasks ensure the application remains stable and issues can be diagnosed in production.

- [ ] **Set Up Testing Infrastructure**
  - [ ] Configure a test runner (e.g., `bun test` or Vitest).
  - [ ] Write unit tests for the pure `questify` function.
  - [ ] Write schema validation tests for the complex discriminated unions in `src/habit/schema.ts`.

- [ ] **Add Basic Observability**
  - [ ] Implement SvelteKit's `handleError` hook to log server-side errors.
  - [ ] Create a `/health` or `/healthz` endpoint that pings the database (`SELECT 1`) to act as a readiness probe.
