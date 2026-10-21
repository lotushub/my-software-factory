import { createStep, createWorkflow } from '@mastra/core/workflows'
import { z } from 'zod'
import { taskBriefAgent } from '../agents/task-brief-agent.ts'

const ideaSchema = z.object({
  idea: z.string().trim().min(5).max(2000),
})

const promptSchema = z.object({ prompt: z.string() })
const briefSchema = z.object({ brief: z.string() })

const prepareIdea = createStep({
  id: 'prepare-idea',
  inputSchema: ideaSchema,
  outputSchema: promptSchema,
  execute: async ({ inputData }) => ({
    prompt: `Create one task brief for this change:\n\n${inputData.idea}`,
  }),
})

const writeTask = createStep({
  id: 'write-task',
  inputSchema: promptSchema,
  outputSchema: briefSchema,
  execute: async ({ inputData }) => {
    const response = await taskBriefAgent.generate(inputData.prompt)
    return { brief: response.text }
  },
})

export const ideaToTaskWorkflow = createWorkflow({
  id: 'idea-to-task',
  inputSchema: ideaSchema,
  outputSchema: briefSchema,
})
  .then(prepareIdea)
  .then(writeTask)
  .commit()
