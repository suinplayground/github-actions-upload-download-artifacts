const github = require('@actions/github')

console.log({context: github.context})

console.log({TOKEN_SIZE: process.env.GITHUB_TOKEN?.length});

(async () => {
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

    while (true) {
        const result = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts', {
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            run_id: github.context.runId,
        })

        console.log(result.data.artifacts)

        if (result.data.total_count > 0) {
            break
        }
        await new Promise(resolve => setTimeout(resolve, 5000))
    }
})()
