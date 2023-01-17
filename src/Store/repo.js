import { atom } from "recoil";

export const rc_repo_savedRepoList = atom({
    key: "rc_repo_savedRepoList",
    default: [],
});

export const rc_repo_savedRepoTarget = atom({
    key: "rc_repo_savedRepoTarget",
    default: null,
});

export const rc_repo_searchRepoList = atom({
    key: "rc_repo_searchRepoList",
    default: [],
});

export const rc_repo_searchRepoList_pageCount = atom({
    key: "rc_repo_searchRepoList_pageCount",
    default: 0,
});

export const re_repo_searchPage = atom({
    key: "re_repo_searchPage",
    default: 1,
});
