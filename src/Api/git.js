import client from "./client";

// Repo 조회
export const getRepoApi = ({ searchParams, page = 1 }) =>
    client.get(
        `https://api.github.com/search/repositories?q=${searchParams}&page=${page}`
    );

// Issue 조회
export const getIssueApi = ({ user, repo, page = 1 }) =>
    client.get(
        `https://api.github.com/repos/${user}/${repo}/issues?page=${page}`
    );
