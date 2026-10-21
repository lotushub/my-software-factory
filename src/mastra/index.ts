import { Mastra } from '@mastra/core'
import { taskBriefAgent } from './agents/task-brief-agent.ts'
import { ideaToTaskWorkflow } from './workflows/idea-to-task.ts'
import { issueToPrWorkflow } from './workflows/issue-to-pr.ts'

export const mastra = new Mastra({
  agents: { taskBriefAgent },
  workflows: { ideaToTaskWorkflow, issueToPrWorkflow },
})
