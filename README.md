# ID Master

A case-based infectious disease learning site for clinicians in training, with adult, pediatric and shared concepts explicitly identified.

- **Modules:** review the clinical decision, its scope, and the evidence behind it.
- **Learning Lab:** commit to an answer before seeing the decisive clue and rationale. Compare how the decision changes with age, setting, or the test used.
- **Scope:** synthetic cases for learning. Use current local protocols and clinical judgment for patient care.

## Development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

For browser verification, install Playwright without modifying the lockfile and test the production build:

```sh
npm install --no-save --package-lock=false playwright@1.58.2
npx playwright install chromium
node scripts/smoke.mjs
```

The browser suite checks direct routes at phone and desktop sizes, asset failures, page errors, keyboard navigation, and theme persistence. To smoke-test a deployment, set `SMOKE_BASE_URL` to the verified deployment URL. The site requires no account or patient information.

## Evidence maintenance

Keep the source next to each consequential decision. Record the publishing body, population or setting, version, and exceptions; distinguish a national guideline, local pathway, and primary trial. Where professional societies disagree, present that conflict instead of silently combining them. When updating a branch, update the matching case, distractors and boundary tests together. Keep the clinical pathway conservative when inputs fall outside its scope.

Vercel serves the Vite build. Its rewrite supports direct visits to client-side routes. Compare the Git commit in Vercel with the merged commit before calling a deployment current.
