import { IconButton, Input, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import useAxios from "../../Hook/useAxios";
import { getRepoApi } from "../../Api/git";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    rc_repo_searchRepoList,
    rc_repo_searchRepoList_pageCount,
    re_repo_searchPage,
    re_repo_searchPageIsLoading,
} from "../../Store/repo";

const SearchArea = () => {
    // 조회 api
    const [getRepoResult, getSearchRepo] = useAxios(getRepoApi);

    // 검색 관련 변수
    const [searchValue, setSearchValue] = useState("");
    const [searchPage, setSearchPage] = useRecoilState(re_repo_searchPage);

    // 리스트 조회 결과 저장
    const setSearchRepoList = useSetRecoilState(rc_repo_searchRepoList);

    // 로딩상태 저장
    const setSearchPageIsLoading = useSetRecoilState(
        re_repo_searchPageIsLoading
    );

    // 리스트 조회 결과로 새성되는 Pagination 개수
    const setSearchRepoListPageCount = useSetRecoilState(
        rc_repo_searchRepoList_pageCount
    );

    // onSubmit 이벤트
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            // 입력값
            const inputValue = e.target[0].value;
            setSearchValue(inputValue);
            setSearchPage(1);
        },
        [setSearchPage]
    );

    // 검색
    useEffect(() => {
        if (!searchValue) return;
        getSearchRepo({ searchParams: searchValue, page: searchPage });
    }, [searchValue, searchPage, getSearchRepo]);

    // 검색 결과 처리
    useEffect(() => {
        setSearchPageIsLoading(getRepoResult.isLoading);
        if (getRepoResult.isLoading) return;

        if (getRepoResult.data) {
            setSearchRepoList(getRepoResult.data.items);
            setSearchRepoListPageCount(getRepoResult.data.total_count);
        } else {
            setSearchRepoList([]);
            setSearchRepoListPageCount(0);
        }
    }, [
        getRepoResult,
        setSearchPageIsLoading,
        setSearchRepoList,
        setSearchRepoListPageCount,
    ]);

    return (
        <SearchAreaBlock>
            <form onSubmit={onSubmit}>
                <Input
                    id="searchRepo"
                    placeholder="Repo Name"
                    name="searchRepo"
                    type="text"
                    required={true}
                />
                <IconButton type="submit">
                    <SearchIcon />
                </IconButton>
            </form>
            <Typography variant="body2" color="text.secondary">
                Result:{" "}
                {getRepoResult.data ? getRepoResult.data.total_count : 0}
            </Typography>
        </SearchAreaBlock>
    );
};

const SearchAreaBlock = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    form {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        margin-right: 10px;
        padding: 0 10px;
    }
`;
export default SearchArea;
