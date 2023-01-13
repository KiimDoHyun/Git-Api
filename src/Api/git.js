import client from "./client";

export const searchRepoApi = ({ searchParams, page = 1 }) =>
    client.get(
        `https://api.github.com/search/repositories?q=${searchParams}&page=${page}`
    );
