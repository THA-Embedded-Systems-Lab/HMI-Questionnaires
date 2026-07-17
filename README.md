# Human Machine Interaction Questionnaire Application

[![Check Links](https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/actions/workflows/check-links.yml/badge.svg)](https://github.com/THA-Embedded-Systems-Lab/HMI-Questionnaires/actions/workflows/check-links.yml)

A website listing most common human machine interaction questionnaires for
filtering, sorting and assessing questionnaires for your needs.

## Development

### Requirements

- [Bun](https://bun.sh/) (v1.2 or higher)
- Git

### How to Develop Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/tha-embedded-systems-lab/HMI-Questionnaires.git
   cd HMI-Questionnaires
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically
   `http://localhost:5173/HMI-Questionnaires/`). This should also be displayed
   in the terminal output.

5. Make your changes - the development server will automatically reload when you
   save files

6. Run linting to check your code:

   ```bash
   bun run lint
   ```

### Pre-commit Hooks

This project uses Husky to enforce code quality standards before commits.

Husky is automatically activated when you run `bun install`. This executes the
`prepare` script which initializes Husky hooks.

If hooks are not working, you can manually activate Husky:

```bash
bun run prepare
```

This will set up the Git hooks in your local repository.

The following checks run automatically on every commit:

- **Linting**: ESLint runs on all `.ts` and `.tsx` files to ensure code quality
- **Commit message validation**: Commitlint ensures commit messages follow the
  [Conventional Commits](https://www.conventionalcommits.org/) format

If any of these checks fail, the commit will be blocked. Fix the issues and try
committing again.

**Commit Message Format:**

```git
<type>(<scope>): <subject>

Examples:
feat: add new questionnaire filter
fix: resolve modal display issue
docs: update README with setup instructions
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### How to Publish a New Version

1. Ensure all changes are committed and pushed to the main branch

2. Bump the version. `bun pm version` updates the `package.json` version field
   and creates a matching git commit and tag in one step:

   ```bash
   bun pm version patch   # or: minor | major | <major>.<minor>.<patch>
   git push --follow-tags
   ```

3. Deploy to GitHub Pages:

   ```bash
   bun run deploy
   ```

   This will automatically build the project and publish it to the `gh-pages`
   branch

**Note:** The version number and date displayed in the application are
automatically extracted from the latest git tag during the build process.

## Contributing

We welcome contributions to this project! If you have suggestions for
improvements or new features, please open an issue or submit a pull request.

In case you are not familiar with GitHub or Git version control, please have a
look at the detailed guide on how to contribute to this project in
[contribution guide](docs/ContributionGuide.md)

### Updating Questionnaire Data

Questionnaire data is stored in the
[`src/questionnaires.ts`](./src/questionnaires.ts) file. If you find any
inaccuracies or outdated information, please open a pull request with the
necessary updates.

### Adding Questionnaires

In case a questionnaire is missing, feel free to open a pull request with the
details.

## Citation

This project is also published as an open access paper:
[10.1007/978-3-032-30552-7_44](https://doi.org/10.1007/978-3-032-30552-7_44)

```bibtex
@inproceedings{10.1007/978-3-032-30552-7_44,
  author    = {Schmidt, Moritz
               and Schaffernak, Insa
               and Watermann, Lara
               and Kubowitsch, Simone
               and Hatfield, Sarah
               and Lermer, Eva
               and Teynor, Alexandra
               and Meitinger, Claudia},
  editor    = {Stephanidis, Constantine
               and Margetis, George
               and Ntoa, Stavroula
               and Antona, Margherita
               and Salvendy, Gavriel},
  title     = {HMI-Questionnaires: A Community-Driven, Open-Access Project for Human-Machine Interaction Scales},
  booktitle = {HCI International 2026 Posters},
  year      = {2026},
  publisher = {Springer Nature Switzerland},
  address   = {Cham},
  pages     = {461--470},
  isbn      = {978-3-032-30552-7}
}
```
