const github = require('@actions/github')

console.log({context: github.context})

console.log({TOKEN_SIZE: process.env.GITHUB_TOKEN?.length});

(async () => {
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
    const result = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts', {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        run_id: github.context.runId,
    })

    console.log(result)
})()
