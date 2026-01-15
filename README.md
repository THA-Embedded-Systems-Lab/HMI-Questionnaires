# Human Machine Interaction Questionnaire Application

A website listing most common human machine interaction questionnaires for
filtering, sorting and assessing questionnaires for your needs.

## Development

### Requirements

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git

### How to Develop Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/tha-embedded-systems-lab/HMI-Questionnaires.git
   cd HMI-Questionnaires
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically
   `http://localhost:5173/HMI-Questionnaires/`). This should also be displayed
   in the terminal output.

5. Make your changes - the development server will automatically reload when you
   save files

6. Run linting to check your code:

   ```bash
   npm run lint
   ```

### Pre-commit Hooks

This project uses Husky to enforce code quality standards before commits.

Husky is automatically activated when you run `npm install`. This executes the
`prepare` script which initializes Husky hooks.

If hooks are not working, you can manually activate Husky:

```bash
npm run prepare
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

2. Create and push a new git tag with the version number:

   ```bash
   git tag <major>.<minor>.<patch>
   git push --tags
   ```

   Update the `package.json` version field.

3. Deploy to GitHub Pages:

   ```bash
   npm run deploy
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
