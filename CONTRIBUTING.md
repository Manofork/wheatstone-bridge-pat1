# Contributing

Thank you for your interest in improving Wheatstone Bridge PAT 1.

## 1. Ground rules

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating. The calculation logic and
the PAT default values are frozen and must not change, unless an issue demonstrates a discrepancy
against the DHET Lecturer's Guide referenced in the README. `renderer/index.html` must remain a single
self contained file, with no build step and no new external dependencies beyond the existing content
delivery network resources (MathJax, Google Fonts).

## 2. Development setup

```bash
git clone https://github.com/Manofork/wheatstone-bridge-pat1.git
cd wheatstone-bridge-pat1
npm ci
npm start
npm run lint
```

## 3. Branches

Branch from `main` using one of the following prefixes: `feat/`, `fix/`, `docs/`, `ci/`.

## 4. Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`,
`refactor:`, `ci:`, `chore:`.

## 5. Pull requests

Fill in the pull request template in full. Continuous integration must be green before review. Include
a screenshot for any visual change, and include the print preview for any change touching styles.

## 6. Reporting calculation problems

Use the **Calculation discrepancy** issue form and give the exact input values together with the
expected figure from the DHET Lecturer's Guide.

## 7. Release process (maintainers only)

1. Update `version` in `package.json` and `CITATION.cff`, then run `npm install` so the lock file
   matches.
2. Move the relevant `[Unreleased]` entries in `CHANGELOG.md` under the new version heading with the
   release date.
3. Commit as `chore(release): vX.Y.Z`.
4. Tag the commit `vX.Y.Z` and push with `--follow-tags`.
5. The Release workflow builds the installer and the portable executable and publishes the GitHub
   Release automatically.
