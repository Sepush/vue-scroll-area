# Vue Scroll Area - Agent Guide

Vue 3 custom scroll area component library with DOM-level custom scrollbar.

## Tech Stack

- Vue 3.5+ / TypeScript 5.8+ / Vite 7.0+
- pnpm 10.13.1 + workspaces
- dprint (formatting) / oxlint (linting)
- husky + lint-staged (Git Hooks)

## Project Structure

```
packages/
├── scroll-area/          # Main library (vue-scroll-area)
│   ├── src/components/   # Vue components and core logic
│   │   ├── ScrollArea.vue      # Main component
│   │   ├── setup-scroll.ts     # Core scroll logic
│   │   ├── public-types.ts     # Public types
│   │   └── index.css           # Component styles
│   └── dist/             # Build output
└── playground/           # Dev/demo app
```

## Common Commands

```bash
# Development
pnpm dev              # Run both lib and playground
pnpm dev:lib          # Library only (watch mode)
pnpm dev:playground   # Playground only

# Build
pnpm build            # Build library

# Code quality
pnpm format           # Format files (use first)
pnpm lint:fix         # Auto-fix lint errors (use first)
pnpm lint             # Check lint
```

## Code Style

### Fixing Lint/Format Errors

**Always try auto-fix first**, do not manually edit:

```bash
pnpm lint:fix
pnpm format
```

### dprint Config

- Line width 100 / 2-space indent / LF endings
- Single quotes / no semicolons / trailing commas on multi-line
- Arrow function parentheses required / sorted imports

### oxlint Config

- Plugins: import, typescript, unicorn, vue
- correctness=error, suspicious=warn, perf=warn
- Vue rules: no-unused-refs, no-ref-as-operand, require-v-for-key, etc.

## Architecture

### Component Communication

Uses Vue Provide/Inject via `scrollAreaInjectionKey`.

### Core Scroll Logic (`setup-scroll.ts`)

- DOM-driven: scroll position updates scrollbar
- Bar-driven: dragging scrollbar updates DOM scroll position
- Dynamic scrollbar size calculation and clamping

### Container Render Modes

1. **Default**: `ScrollContainerDefault.vue` + ResizeObserver
2. **Custom**: via `containerRender` prop (e.g., textarea integration)

### CSS

- CSS variables for dynamic values (e.g., `--container-height`)
- Hide native scrollbar: `scrollbar-width: none` + `::-webkit-scrollbar`
- Gutter positioning: `sticky` (default) or `absolute`

## Language Rules

| Context                      | Language |
| ---------------------------- | -------- |
| User interaction             | Chinese  |
| Documentation, code comments | English  |
| Source code                  | English  |
| Commit messages              | English  |

## Dev Conventions

- Use `<script setup lang="ts">` + `useTemplateRef()`
- Import props types from `public-types.ts`
- Styles in `index.css` (not scoped), BEM naming `.scroll-area-*`
- Use CSS variables for dynamic values, not inline styles

## Notes

- Library manipulates DOM directly; ensure cleanup in `onUnmounted`
- If playground doesn't see changes, ensure lib is built (`pnpm dev:lib`)
- If types don't resolve, run `pnpm build` to generate declarations
