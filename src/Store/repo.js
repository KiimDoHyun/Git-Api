import { atom } from "recoil";

// 저장된 Repo 리스트
export const rc_repo_savedRepoList = atom({
    key: "rc_repo_savedRepoList",
    default: [],
});

// 검색결과 Repo 리스트
export const rc_repo_searchRepoList = atom({
    key: "rc_repo_searchRepoList",
    default: [],
});

// 검색결과 Repo 리스트 페이지 카운트
export const rc_repo_searchRepoList_pageCount = atom({
    key: "rc_repo_searchRepoList_pageCount",
    default: 0,
});

// 검색결과 Repo 리스트 검색 페이지
export const re_repo_searchPage = atom({
    key: "re_repo_searchPage",
    default: 1,
});

// 검색결과 Repo 리스트 로딩상태
export const re_repo_searchPageIsLoading = atom({
    key: "re_repo_searchPageIsLoading",
    default: false,
});

// 검색결과 Repo 리스트 상세정보 Dialog 활성화 여부
export const rc_user_showRepoInfoDialog = atom({
    key: "rc_user_showRepoInfoDialog",
    default: false,
});

// 검색결과 Repo 리스트 상세정보표시를 위한 데이터
export const rc_user_RepoInfo = atom({
    key: "rc_user_RepoInfo",
    default: null,
});
