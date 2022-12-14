const core = require('@actions/core')
const { context } = require('@actions/github')
const fetch = require('node-fetch')

module.exports = async function postToSmee () {
  // Serialize payload object
  const payload = {
    ...context.payload
  }

  // Serialize headers
  const headers = {
    'X-GitHub-Event': process.env.GITHUB_EVENT_NAME,
    // Used to prevent duplication
    'X-GitHub-Delivery': process.env.GITHUB_RUN_ID
  }
  // Get the channel id
  // const channel = (
  //   // Use the provided `channel` input
  //   core.getInput('channel') ||
  //   // Default to `owner-repo`
  //   `${context.repo.owner}-${context.repo.repo}`
  // )

  // Send the data to Smee
  const url = core.getInput('webhook').trimRight('/');
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })

  core.info(`Done! Check it out at ${url}.`)
  core.info('Remember that Smee only shows payloads received while your browser tab is open!')
  core.setOutput('url', url)
}
