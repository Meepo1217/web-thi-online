---
name: figma-react-ui-designer
description: Converts Figma-exported CSS and Auto Layout properties into clean React components for the content area of an app with a fixed shell (Sidebar/Header) and a routed content area. Respects the project's existing architecture and CSS conventions. Use when the user pastes CSS from Figma, shares Figma design specs, or asks to build a new page or component for the React project.
---

# Figma to React UI Designer

Converts Figma CSS output into pixel-accurate React components that fit the project's existing structure, styles, and conventions, while leaving the fixed app shell untouched.

## When to Use

- The user pastes CSS or Auto Layout properties exported from Figma.
- The user asks for a new Page or Component to be built from a design.
- Colors, sizes, spacing, or typography must match the original Figma design.

## Workflow

1. **Inspect the project first.** Before creating any file:
    - List the structure of `src/components` and `src/pages` (e.g. `tree` or `ls -R`).
    - Read the global stylesheet (e.g. `src/index.css`) to learn existing classes, CSS variables, and design tokens.
    - Check an existing page or component to learn naming, export, and import conventions.
2. **Analyze the Figma input.** Identify the layout structure, repeated elements, interactive elements, text hierarchy, and icons. Separate the content area from any shell parts (Sidebar/Header) included in the frame.
3. **Map to existing code.** Reuse existing components and classes wherever they already match the design.
4. **Write the component and styles** following the rules below.
5. **Run the final checklist** before replying.

## Project Architecture Rules

- Static shell parts (Header, Sidebar, Footer, layout wrapper) go in `components/layout/`.
- Pages rendered inside `<Outlet />` go in `pages/`.
- Reusable UI pieces go in `components/`, following the folder conventions already in use.
- Do not modify unrelated files. Only touch files needed for the requested UI.
- Static shell parts go in `components/layout/<role>/` (e.g. `layout/teacher/`),
  one folder per user role. Only pieces genuinely shared by two or more roles go in
  `components/layout/shared/`.
- Pages rendered inside `<Outlet />` go in `pages/<role>/`.
- Group by feature. A feature with two or more files gets its own folder:
  pages in `pages/<role>/<feature>/`, feature-specific components in
  `components/<feature>/`, API calls in `services/<feature>Service.js`.
- Components used by multiple features go in `components/ui/`.
- Do not create a feature folder for a single-file page.
- Before creating a new feature folder, check whether one already exists
  and reuse it.

## App Shell Rule (Fixed Shell + Swappable Content)

The app uses a fixed shell with a swappable content area:

- The **shell** (Sidebar, Header, Footer, and the layout wrapper) is static and persistent across all routes.
- Only the **content area** (rendered via `<Outlet />`) changes per page.

When the user asks for a new screen or pastes Figma CSS:

1. Assume the design applies to the **content area only**, unless the user explicitly says it is for the shell.
2. Create a new file in `src/pages/` (and sub-components in `src/components/` if needed). Do NOT edit `components/layout/*` or the layout wrapper.
3. Do not duplicate the Sidebar/Header inside a page. A page component returns only its own content.
4. Size the page to fill the content area (e.g. `width: 100%`) and never assume the full viewport. Ignore any Sidebar/Header portions present in the Figma frame.
5. Register the new page as a route nested under the layout route. Add a Sidebar link only if the user asks for it.
6. Only modify the shell when the user explicitly requests a shell change.

## Styling Priority

1. **Reuse** existing classes (e.g. `.card`, `.btn-primary`, `.form-control`) and CSS variables when they match the design.
2. **Create new classes** in the appropriate stylesheet when no existing class fits. Use a modifier class (e.g. `.card--compact`) instead of editing a shared class when values differ from Figma.
3. **Use inline `style={{}}`** only for truly dynamic or one-off values (e.g. values driven by props or state).
4. If a color or spacing value already exists as a CSS variable with the exact same value, use the variable. Otherwise use the exact Figma value.

## Figma CSS Conversion Rules

1. **Clean up Figma noise:**
    - Drop `isolation: isolate;` and `box-sizing: border-box;` (handled globally).
    - Remove auto-generated comments such as `/* Auto layout */`, `/* Inside auto layout */`, `/* Vector */`.
    - Keep `flex: none`, `order`, `flex-grow: 0` only when they actually affect the layout; otherwise drop them.
2. **Layout:** Prefer flexbox or grid over `position: absolute` with `left/top`. Use absolute positioning only for genuinely overlaid elements (badges, floating buttons), keeping sizes unchanged.
3. **Semantic HTML:**
    - Use Figma layer names (e.g. `Button - Primary Action`) to choose the right element (`<button>`, `<a>`, `<input>`, `<nav>`, `<ul>/<li>`).
    - Choose heading levels (`h1`–`h3`) by the page's content hierarchy, not only by font size. Each page has one `h1`.
    - Interactive elements must be keyboard-accessible, and images need `alt` text.
4. **Typography:** Keep the exact `font-family`, `font-size`, `font-weight`, `line-height`, and `letter-spacing`. If the font is not loaded in the project, tell the user instead of silently substituting it.
5. **SVG icons:**
    - Inline the SVG in JSX using valid React attributes (`strokeWidth`, `fillRule`, `className`).
    - Remove redundant wrapper groups, fixed `width`/`height` that block sizing, and empty or duplicate elements. Never delete paths that contribute to the visible shape.
    - Replace hard-coded fill/stroke colors with `currentColor` when the icon should inherit text color.
6. **React conventions:** Use `className` (not `class`), camelCase style properties, self-closing tags, and unique `key` props for mapped lists.

## Fidelity Rules

- Sizes (width, height, padding, gap, border radius) and colors (HEX, RGBA, gradients, shadows) must match Figma exactly. Do not round or "clean up" values.
- If a fixed Figma width would break responsiveness, keep the value as `max-width` or document it, and ask the user before changing the design.

## Gotchas

- Do NOT install extra CSS libraries (Tailwind, Bootstrap, Material UI, etc.) unless the user asks. Stay with lightweight React + plain CSS.
- Do NOT overwrite or rewrite existing shared classes; extend them with new classes.
- Do NOT touch the shell (Sidebar, Header, layout wrapper) when only the content area is requested.
- If the Figma input is ambiguous (missing states, unclear hierarchy, conflicting values), ask one concise question rather than guessing.

## Final Checklist

- [ ] Only the content area was built; the shell is untouched.
- [ ] File placed in the correct directory (`pages/` or `components/`).
- [ ] Route registered under the layout route (no Sidebar link unless requested).
- [ ] Existing classes and variables reused where possible.
- [ ] No Figma noise left in the code (comments, redundant properties).
- [ ] Exact Figma values preserved.
- [ ] Semantic tags and accessibility basics in place.
- [ ] No new dependencies added.
