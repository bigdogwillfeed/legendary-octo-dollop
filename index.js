import { getInput, setOutput, setFailed } from '@actions/core';
import {context, GitHub} from '@actions/github';

async function run() {
  const octokit = new GitHub(getInput('token'));
  const head = await octokit.git.getRef({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: context.ref.substr(5), // remove `refs/`
  });
  setOutput('isHead', head.object.sha === context.sha);
}

run().catch(error => setFailed(error.message));