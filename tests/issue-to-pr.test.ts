import assert from 'node:assert/strict'
import test from 'node:test'
import { hasVisualChanges, makePrBody } from '../src/mastra/workflows/issue-to-pr.ts'

test('visual site changes require a screenshot', () => {
  assert.equal(hasVisualChanges(['sites/revolution/dist/style.css']), true)
  assert.equal(hasVisualChanges(['sites/revolution/dist/app.js']), true)
  assert.equal(hasVisualChanges(['README.md', 'src/mastra/index.ts']), false)
})

test('PR body includes the issue, summary, check, and optional screenshot', () => {
  const body = makePrBody(42, 'Added keyboard navigation.', 'screenshots/issue-42.png', 'https://example.com/issue-42.png')
  assert.match(body, /Closes #42/)
  assert.match(body, /Added keyboard navigation\./)
  assert.match(body, /npm run check/)
  assert.match(body, /!\[Updated website\]\(https:\/\/example\.com\/issue-42\.png\)/)

  const textOnly = makePrBody(42, 'Updated docs.', null, null)
  assert.doesNotMatch(textOnly, /Screenshot/)
})
