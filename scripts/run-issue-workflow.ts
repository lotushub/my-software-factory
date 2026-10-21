import { mastra } from '../src/mastra/index.ts'

const repository = process.env.GITHUB_REPOSITORY
const issueNumber = Number(process.env.ISSUE_NUMBER)
const baseBranch = process.env.BASE_BRANCH
const model = process.env.CODEX_MODEL
const runId = process.env.GITHUB_RUN_ID

if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY repository secret is required')
if (!repository || !baseBranch || !model || !runId || !Number.isInteger(issueNumber) || issueNumber < 1) {
  throw new Error('GITHUB_REPOSITORY, ISSUE_NUMBER, BASE_BRANCH, CODEX_MODEL, and GITHUB_RUN_ID are required')
}

const workflow = mastra.getWorkflow('issueToPrWorkflow')
const run = await workflow.createRun()
const result = await run.start({ inputData: { repository, issueNumber, baseBranch, model, runId } })
if (result.status !== 'success') throw new Error(`Issue workflow ended with status ${result.status}`)
console.log(`Pull request: ${result.result.prUrl}`)
