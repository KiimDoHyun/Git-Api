import client from "./client";

export const searchRepoApi = (searchParams) =>
    client.get(`https://api.github.com/search/repositories?q=${searchParams}`);
