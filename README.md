# My Software Factory

This repo contains the [French Revolution website](sites/revolution/README.md) and a small Mastra workflow for turning a change idea into a task brief.

## Idea → task workflow

The workflow has two steps: prepare the idea, then ask an AI agent to write a brief with a goal, up to three steps, and checks for completion. It creates a draft for a human to review; it does not change the website.

1. Use Node.js 22.18 or newer and run `npm install` in the repo root.
2. Set `OPENAI_API_KEY` in your environment (see `.env.example`).
3. Run `npm run dev` and open [Mastra Studio](http://localhost:4111).
4. Select **Workflows → idea-to-task** and enter an `idea`, such as `Add a keyboard shortcut to move between timeline events`.

The result is a Markdown `brief`. The workflow code is in `src/mastra/workflows/idea-to-task.ts`, and the agent's writing rules are in `src/mastra/agents/task-brief-agent.ts`.

Run `npm run check` to type-check the Mastra code. An API key is needed to generate a brief.

## Issue → pull request workflow

Adding the **`codex:implement`** label to an open GitHub issue starts the [GitHub Action](.github/workflows/issue-to-pr.yml). Its [Mastra workflow](src/mastra/workflows/issue-to-pr.ts) does four things in order:

1. Reads the issue and checks that it still has the label.
2. Runs Codex on a fresh branch to implement it, then runs `npm run check`.
3. Takes a screenshot of the French Revolution website if its HTML, CSS, JavaScript, or images changed.
4. Pushes the branch and opens a pull request with a change summary, the issue link, the check result, and the screenshot when applicable.

To enable it, create the `codex:implement` repository label, add an `OPENAI_API_KEY` repository secret, and allow GitHub Actions to create pull requests in the repository's Actions settings. The default Codex model is `gpt-6.1-sol`; set the repository variable `CODEX_MODEL` to use a different available model. The Action uses GitHub's built-in `GITHUB_TOKEN` for the PR. It opens a draft PR for human review.

The screenshot is stored in the PR branch at `screenshots/issue-<number>.png`. If Codex makes no changes or a required check fails, the run fails without opening a PR. Run `npm test` for the workflow's visual-change and PR-body checks.
