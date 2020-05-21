import { getInput, setOutput, setFailed } from '@actions/core';
import {context, GitHub} from '@actions/github';

async function run() {
  const octokit = new GitHub(getInput('token'));
  const head = await octokit.git.getRef({
    ...context.repo,
    ref: context.ref,
  });
  setOutput('isHead', head.object.sha === context.sha);
}

try {
  run()
} catch (error) {
  setFailed(error.message);
}